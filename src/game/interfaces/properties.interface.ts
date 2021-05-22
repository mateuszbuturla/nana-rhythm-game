interface IPosition {
  x: number;
  y: number;
}

interface ISize {
  width: number;
  height: number;
}

type TypeXAlign = 'left' | 'center' | 'right' | number;

export { IPosition, ISize, TypeXAlign };
