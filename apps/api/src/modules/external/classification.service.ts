import { Injectable } from '@nestjs/common';
import { FindManyClassificationArgs, FindUniqueClassificationArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getClassifications({ where, ...args }: FindManyClassificationArgs) {
    return this.prisma.classification.findMany({
      where: {
        ...where,
      },
      ...args,
      include: {},
    });
  }

  async getClassification(args?: FindUniqueClassificationArgs) {
    return this.prisma.classification.findUnique({ ...args });
  }

  // classifications tree data algorithm

  async getGroupedClassifications(args: FindManyClassificationArgs): Promise<any> {
    const classifications = await this.prisma.classification.findMany({
      where: {
        effective_status: 'Active',
        peoplesoft_id: 'BCSET',
        ...args.where,
      },
      ...args,
    });

    const grouped = {};

    classifications.forEach((classification) => {
      const nameParts = classification.name.split(' ');
      let currentLevel = grouped;

      for (let i = 0; i < nameParts.length; i++) {
        const part = nameParts.slice(0, i + 1).join(' ');

        if (!currentLevel[part]) {
          currentLevel[part] = { _items: [] };
        }

        if (i === nameParts.length - 1) {
          currentLevel[part]._items.push({
            id: classification.id,
            name: classification.name,
            employee_group_id: classification.employee_group_id,
          });
        } else {
          currentLevel = currentLevel[part];
        }
      }
    });

    let tree = this.convertToNestedArray(grouped);
    tree = this.unwrapSingleChildGroups(tree);
    tree = this.simplifyStructure(tree);
    // console.log('tree before sort: ', JSON.stringify(tree));
    tree = this.sortItemsByName(tree);
    // console.log('tree after sort: ', JSON.stringify(tree));

    // add (Grade - X) to entries that have same names but different grades so they are not confused
    tree = await this.includeDuplicateGrades(tree);

    return tree;
  }

  private async includeDuplicateGrades(nodes: any[]): Promise<any[]> {
    const duplicateGrades: { id: string; name: string; grade: string }[] = await this.prisma.$queryRaw`
      SELECT c1.id, c1.name, c1.grade
      FROM classification c1
      WHERE c1.effective_status = 'Active'
        AND EXISTS (
          SELECT 1
          FROM classification c2
          WHERE c2.name = c1.name
            AND c2.grade <> c1.grade
            AND c2.effective_status = 'Active'
        )
      ORDER BY c1.name, c1.grade;
    `;

    const duplicateGradesMap = new Map(duplicateGrades.map((entry) => [entry.id, entry]));

    const processNode = (node: any) => {
      if (node.items) {
        node.items = node.items.map((item: any) => {
          if (duplicateGradesMap.has(item.id)) {
            const { name, grade } = duplicateGradesMap.get(item.id);
            item.name = `${name} (Grade - ${grade})`;
          }
          return processNode(item);
        });
      }
      return node;
    };

    return nodes.map(processNode);
  }

  private sortItemsByName(nodes) {
    // Function to determine if a node is a group (has children)
    const isGroup = (node) => Array.isArray(node.items) && node.items.length > 0;

    // Function to get the sorting key (either groupName or name)
    const getSortKey = (node) => node.groupName || node.name || '';

    // Sort the nodes array
    nodes.sort((a, b) => {
      // Prioritize group nodes over single nodes
      if (isGroup(a) && !isGroup(b)) {
        return -1;
      } else if (!isGroup(a) && isGroup(b)) {
        return 1;
      }

      // If both are groups or both are single items, sort by name
      return getSortKey(a).localeCompare(getSortKey(b));
    });

    // Recursively sort the items in each node
    nodes.forEach((node) => {
      if (node.items && Array.isArray(node.items)) {
        this.sortItemsByName(node.items);
      }
    });

    return nodes;
  }

  private simplifyStructure(nodes) {
    return nodes.map((node) => {
      // console.log('checking node: ', JSON.stringify(node));
      // Merge the children into items if they exist
      if (node.children) {
        node.items = (node.items || []).concat(this.simplifyStructure(node.children));
        delete node.children; // Remove children as they are now merged
      }

      // If there's only one item in the node and no nested items within it,
      // return the single item with the groupName of the parent node
      if (node.items && node.items.length === 1 && (!node.items[0].items || node.items[0].items.length === 0)) {
        // console.log('SINGLE');
        const ret = {
          ...node.items[0],
          groupName: node.groupName,
        };
        // console.log('ret: ', JSON.stringify(ret));
        return ret;
      }

      // For each item, if it has its own items, recursively simplify them
      if (node.items) {
        node.items = node.items.map((item) => {
          if (item.items) {
            item.items = this.simplifyStructure(item.items);
          }
          return item;
        });
      }

      return node;
    });
  }

  private unwrapSingleChildGroups(nodes) {
    const unwrap = (node) => {
      // If the node has exactly one child, unwrap it
      if (node.children && node.children.length === 1) {
        let singleChild = node.children[0];
        // Continue unwrapping if the child also has exactly one child
        while (singleChild.children && singleChild.children.length === 1) {
          singleChild = singleChild.children[0];
        }
        return {
          ...singleChild,
          groupName: singleChild.groupName,
          items: (node.items || []).concat(singleChild.items || []),
          children: this.unwrapSingleChildGroups(singleChild.children || []),
        };
      }
      return node;
    };

    return nodes.map((node) => {
      if (node.children) {
        node.children = this.unwrapSingleChildGroups(node.children);
      }
      return unwrap(node);
    });
  }

  private convertToNestedArray(grouped: any, isRoot = true): any[] {
    return Object.entries(grouped)
      .map(([groupName, value]: any) => {
        if (groupName === '_items') {
          return null;
        }

        const items = isRoot ? [] : value._items;
        let children = [];

        if (typeof value === 'object' && value !== null) {
          children = this.convertToNestedArray(value, false);
        }

        // Simplify structure if a child has the same name as one of the items
        children.forEach((child, index) => {
          const itemIndex = items.findIndex((item) => item.name === child.groupName);
          if (itemIndex !== -1) {
            items.splice(itemIndex, 1, ...child.items);
            children.splice(index, 1);
          }
        });

        return { groupName, items, children: children.filter((child) => child) };
      })
      .filter((entry) => entry);
  }
}
