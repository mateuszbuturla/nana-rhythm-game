type TDirection = 'up' | 'down' | 'double';

export interface INote {
  direction: TDirection;
  delay: number;
}
