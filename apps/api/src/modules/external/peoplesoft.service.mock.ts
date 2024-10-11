import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { Employee } from './models/employee.model';
import { PositionCreateInput } from './models/position-create.input';

@Injectable()
export class MockPeoplesoftService {
  constructor(private readonly configService: ConfigService<AppConfigDto, true>) {}
  async syncClassifications() {
    console.log('Mock syncClassifications called');
  }

  async syncLocations() {
    console.log('Mock syncLocations called');
  }

  async syncOrganizationsAndDepartments() {
    console.log('Mock syncOrganizationsAndDepartments called');
  }

  async syncOrganizations() {
    console.log('Mock syncOrganizations called');
  }

  async syncDepartments() {
    console.log('Mock syncDepartments called');
  }

  async getEmployeesForPositions(positions: string[]): Promise<Map<string, Employee[]>> {
    console.log('Mock getEmployeesForPositions called with positions:', positions);
    const employeeMap: Map<string, Employee[]> = new Map();
    const randomNames = [
      'Alice Johnson',
      'Bob Smith',
      'Charlie Brown',
      'Dana White',
      'Eve Black',
      'Frank Green',
      'Grace Lee',
      'Hank Miller',
      'Ivy Scott',
      'Jack Wilson',
    ];
    positions.forEach((position) => {
      const mockEmployee: Employee = {
        id: `EMPL${Math.floor(10000 + Math.random() * 90000)}`,
        name: randomNames[Math.floor(Math.random() * randomNames.length)],
        status: 'Active',
      };
      employeeMap.set(position, [mockEmployee]);
    });
    return employeeMap;
  }

  async getEmployee(id: string) {
    console.log('Mock getEmployee called with id:', id);
    return {
      data: {
        query: {
          rows: [
            {
              EMPLID: id,
              NAME_DISPLAY: 'Jane Doe',
              EMPL_STATUS: 'Active',
            },
          ],
        },
      },
    };
  }

  async getProfile(idir: string) {
    console.log('Mock getProfile called with idir:', idir);
    return {
      data: {
        query: {
          rows: [
            {
              USERID: idir,
              NAME: 'John Doe',
              ROLE: 'Employee',
            },
          ],
        },
      },
    };
  }

  async getPositionsForDepartment(department_id: string) {
    console.log('Mock getPositionsForDepartment called with department_id:', department_id);
    return {
      data: {
        query: {
          rows: [
            {
              'attr:rownumber': 1,
              'A.POSITION_NBR': '00123456',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Manager',
              'A.DESCRSHORT': 'BUS LEAD',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '183002',
              'A.POSN_STATUS': 'Frozen',
              'A.STATUS_DT': '2015-06-12',
              'A.REPORTS_TO': '00987623',
              'A.SAL_ADMIN_PLAN': 'MGT',
              'A.TGB_E_CLASS': '',
              'A.LOCATION': 'V8X4S800',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 2,
              'A.POSITION_NBR': '00765432',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Senior Application Architect',
              'A.DESCRSHORT': 'ISL 30R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '508013',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2007-02-06',
              'A.REPORTS_TO': '00678901',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': '',
              'A.LOCATION': 'V8V4R804',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 3,
              'A.POSITION_NBR': '00234567',
              'A.EFFDT': '2024-08-06',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Sr. Full Stack Developer Lvl 4',
              'A.DESCRSHORT': 'ISL 27R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '508011',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2022-03-30',
              'A.REPORTS_TO': '00654982',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'E24569',
              'A.LOCATION': 'V3T5T301',
              'A.UPDATE_INCUMBENTS': 'Y',
            },
            {
              'attr:rownumber': 4,
              'A.POSITION_NBR': '00876543',
              'A.EFFDT': '2024-09-04',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Full Stack Developer - Level 5',
              'A.DESCRSHORT': 'ISL 30R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '508013',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2024-09-04',
              'A.REPORTS_TO': '00912345',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P371',
              'A.LOCATION': 'V8X4S800',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 5,
              'A.POSITION_NBR': '00567891',
              'A.EFFDT': '2024-08-15',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Lead Service Design',
              'A.DESCRSHORT': 'ISL 30R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '508013',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2024-08-15',
              'A.REPORTS_TO': '00543278',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P001',
              'A.LOCATION': 'V8X4S800',
              'A.UPDATE_INCUMBENTS': 'Y',
            },
            {
              'attr:rownumber': 6,
              'A.POSITION_NBR': '00345678',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Sr Prog Dev, Digital Govmt',
              'A.DESCRSHORT': 'ADMN O 27R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '551506',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2018-04-01',
              'A.REPORTS_TO': '00987654',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P250',
              'A.LOCATION': 'V8X4S800',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 7,
              'A.POSITION_NBR': '00987654',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Director, Digital Academy',
              'A.DESCRSHORT': 'Band 3',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '185003',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2019-01-25',
              'A.REPORTS_TO': '00543278',
              'A.SAL_ADMIN_PLAN': 'MGT',
              'A.TGB_E_CLASS': 'P238',
              'A.LOCATION': 'V8X4S800',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 8,
              'A.POSITION_NBR': '00654321',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Coord., Education & Training',
              'A.DESCRSHORT': 'ADMN O 24R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '551505',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2019-04-01',
              'A.REPORTS_TO': '00987654',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P110',
              'A.LOCATION': 'V8X4S800',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 9,
              'A.POSITION_NBR': '00456789',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Digital Talent Analyst',
              'A.DESCRSHORT': 'ADMN O 24R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '551505',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2019-09-12',
              'A.REPORTS_TO': '00912345',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P155',
              'A.LOCATION': 'V8V4R804',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 10,
              'A.POSITION_NBR': '00234589',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Digital Talent Analyst',
              'A.DESCRSHORT': 'ADMN O 24R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '551505',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2021-12-09',
              'A.REPORTS_TO': '00912345',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P155',
              'A.LOCATION': 'V8V4R804',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 11,
              'A.POSITION_NBR': '00543218',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Senior Technical Architect',
              'A.DESCRSHORT': 'ISL 30R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '508013',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2022-01-26',
              'A.REPORTS_TO': '00812345',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P145',
              'A.LOCATION': 'V8W2C300',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 12,
              'A.POSITION_NBR': '00812345',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Director, Digital Delivery',
              'A.DESCRSHORT': 'Band 4',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '185004',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2020-03-12',
              'A.REPORTS_TO': '00543278',
              'A.SAL_ADMIN_PLAN': 'MGT',
              'A.TGB_E_CLASS': 'P307',
              'A.LOCATION': 'V8V4R804',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 13,
              'A.POSITION_NBR': '00678901',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Senior Product Manager',
              'A.DESCRSHORT': 'Band 3',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '185003',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2020-10-09',
              'A.REPORTS_TO': '00812345',
              'A.SAL_ADMIN_PLAN': 'MGT',
              'A.TGB_E_CLASS': 'E22849',
              'A.LOCATION': 'V8V4R804',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 14,
              'A.POSITION_NBR': '00329871',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Coord., Learn. and Development',
              'A.DESCRSHORT': 'ADMN O 24R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '551505',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2021-06-03',
              'A.REPORTS_TO': '00987654',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P110',
              'A.LOCATION': 'V8W2C300',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 15,
              'A.POSITION_NBR': '00432178',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Sr. Advisor, Modern. Advisory',
              'A.DESCRSHORT': 'ISL 30R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '508013',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2021-06-11',
              'A.REPORTS_TO': '00987654',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P342',
              'A.LOCATION': 'V8W2C300',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 16,
              'A.POSITION_NBR': '00219876',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Sr. Team Lead, Bus Analysis',
              'A.DESCRSHORT': 'ISL 30R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '508013',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2021-06-11',
              'A.REPORTS_TO': '00987654',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P142',
              'A.LOCATION': 'V8W2C300',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 17,
              'A.POSITION_NBR': '00912345',
              'A.EFFDT': '2024-07-22',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Senior Product Manager',
              'A.DESCRSHORT': 'Band 3',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '185003',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2021-10-26',
              'A.REPORTS_TO': '00543278',
              'A.SAL_ADMIN_PLAN': 'MGT',
              'A.TGB_E_CLASS': 'E19310',
              'A.LOCATION': 'V8W2C300',
              'A.UPDATE_INCUMBENTS': 'Y',
            },
            {
              'attr:rownumber': 18,
              'A.POSITION_NBR': '00367812',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'UX and Service Design Lead',
              'A.DESCRSHORT': 'ISL 27R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '508011',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2021-11-19',
              'A.REPORTS_TO': '00912345',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'E24464',
              'A.LOCATION': 'V8W2C300',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 19,
              'A.POSITION_NBR': '00789102',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Training Coordinator',
              'A.DESCRSHORT': 'ADMN O 15R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '551501',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2022-02-24',
              'A.REPORTS_TO': '00987654',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P107',
              'A.LOCATION': 'V8W2C300',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 20,
              'A.POSITION_NBR': '00634528',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Policy Analyst',
              'A.DESCRSHORT': 'ADMN O 24R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '551505',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2022-06-30',
              'A.REPORTS_TO': '00987654',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'P272',
              'A.LOCATION': 'V8W2C300',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 21,
              'A.POSITION_NBR': '00256789',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'IMIT Procurement Lead',
              'A.DESCRSHORT': 'ISL 27R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '508011',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2023-04-20',
              'A.REPORTS_TO': '00812345',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'E25499',
              'A.LOCATION': 'V8W2C300',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 22,
              'A.POSITION_NBR': '00823456',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Senior User Experience Designe',
              'A.DESCRSHORT': 'ISL 27R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '508011',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2022-06-10',
              'A.REPORTS_TO': '00678901',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'E19313',
              'A.LOCATION': 'V8W2C300',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 23,
              'A.POSITION_NBR': '00712389',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Digital Talent Analyst',
              'A.DESCRSHORT': 'ADMN O 24R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '551505',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2022-07-28',
              'A.REPORTS_TO': '00912345',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'E25600',
              'A.LOCATION': 'V8X4S800',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 24,
              'A.POSITION_NBR': '00967823',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Full Stack Developer Lvl 4',
              'A.DESCRSHORT': 'ISL 27R',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '508011',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2022-10-28',
              'A.REPORTS_TO': '00912345',
              'A.SAL_ADMIN_PLAN': 'GEU',
              'A.TGB_E_CLASS': 'E24569',
              'A.LOCATION': 'V8W2C300',
              'A.UPDATE_INCUMBENTS': 'N',
            },
            {
              'attr:rownumber': 25,
              'A.POSITION_NBR': '00543278',
              'A.EFFDT': '2024-07-20',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Exec Dir, Digital Capacity',
              'A.DESCRSHORT': 'Band 5',
              'A.BUSINESS_UNIT': 'BC112',
              'A.DEPTID': '112-0074',
              'B.DESCR': 'DO Talent and Capacity',
              'A.JOBCODE': '185005',
              'A.POSN_STATUS': 'Approved',
              'A.STATUS_DT': '2023-02-14',
              'A.REPORTS_TO': '00210987',
              'A.SAL_ADMIN_PLAN': 'MGT',
              'A.TGB_E_CLASS': 'E26271',
              'A.LOCATION': 'V8X4S800',
              'A.UPDATE_INCUMBENTS': 'N',
            },
          ],
        },
      },
    };
  }

  async getPosition(position_id: string) {
    console.log('Mock getPosition called with position_id:', position_id);
    return {
      data: {
        query: {
          rows: [
            {
              'A.POSN_STATUS': 'Approved',
              'A.EFF_STATUS': 'Active',
              'A.DESCR': 'Mocked Position Title',
              'A.POSITION_NBR': position_id,
              'A.REPORTS_TO': '00987654',
              'A.DEPTID': '112-0074',
              'A.BUSINESS_UNIT': 'BC112',
              'A.JOBCODE': '508013',
              'A.SAL_ADMIN_PLAN': 'GEU',
              TGB_E_CLASS: '',
              EFFDT: '2012-12-03',
            },
          ],
        },
      },
    };
  }

  async createPosition(data: PositionCreateInput) {
    console.log('Mock createPosition called with data:', data);
    return {
      positionNbr: '00000001',
      errMessage: '',
    };
  }
}
