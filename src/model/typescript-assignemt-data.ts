export interface Request {
  id: number;
  description: string;
  title: string;
  creationDate: string;
  state: RequestState;
  invoice: Invoice;
}
export interface Invoice {
  id: number;
  isValid: boolean;
  userId: string;
}
export enum RequestState {
  COMPLETED,
  CANCELLED,
  PLANNED,
}
export const data = [
  {
    id: 1,
    description: 'description1',
    title: 'title1',
    creationDate: '2023-08-17T13:07:15.241Z',
    state: RequestState.COMPLETED,
    invoice: { id: 100, isValid: false, userId: 'user1' },
  },
  {
    id: 2,
    description: 'description2',
    title: 'title2',
    creationDate: '2022-07-17T13:07:15.241Z',
    state: RequestState.CANCELLED,
    invoice: { id: 101, isValid: true, userId: 'user1' },
  },
  {
    id: 3,
    description: 'description3',
    title: 'title3',
    creationDate: '2022-01-17T13:07:15.241Z',
    state: RequestState.PLANNED,
    invoice: { id: 102, isValid: true, userId: 'user2' },
  },
  {
    id: 4,
    description: 'description4',
    title: 'title4',
    creationDate: '2023-08-13T13:07:15.241Z',
    state: RequestState.CANCELLED,
    invoice: { id: 103, isValid: true, userId: 'user3' },
  },
  {
    id: 5,
    description: 'description5',
    title: 'title5',
    creationDate: '2023-08-02T13:07:15.241Z',
    state: RequestState.PLANNED,
    invoice: { id: 104, isValid: false, userId: 'user4' },
  },
] as Request[];
