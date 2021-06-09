export class Status {
  loading?: boolean = false;
  error?: boolean = false;
  success?: boolean = false;
  progressing?: boolean = false;
  message?: string = '';

  static createLoading() {
    let status = new Status();
    status.loading = true;
    return status;
  }

  static createSuccess() {
    let status = new Status();
    status.success = true;
    return status;
  }

  static createError() {
    let status = new Status();
    status.error = true;
    return status;
  }

  static createProgressing() {
    let status = new Status();
    status.progressing = true;
    return status;
  }
}
