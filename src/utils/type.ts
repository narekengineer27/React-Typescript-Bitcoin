export function returntypeof<RT>(expression: (...params: any[]) => RT): RT {
  return {} as RT;
}

export type FormErrors<V> = {[E in keyof V]?: string};

export interface FormProps {
  handleSubmit: (handler: any) => any;
  onSubmit: (values: any) => void;
  change: (field: string, value: any) => void;
  untouch: (field: string) => void;
  invalid?: boolean;
}
