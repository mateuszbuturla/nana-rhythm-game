interface IPosition {
  x: number;
  y: number;
}

interface ISize {
  width: number;
  height: number;
}

type TypeXOrigin = 'left' | 'center' | 'right' | number;

type TypeYOrigin = 'top' | 'center' | 'bottom' | number;

export { IPosition, ISize, TypeXOrigin, TypeYOrigin };
