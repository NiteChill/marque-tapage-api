export class LoggerService {
  private static log(message: string, level: string): void {
    console.log(`${new Date().toISOString()} [${level}] ${message}`);
  }

  static info(message: string): void {
    this.log(message, 'INFO');
  }

  static debug(message: string): void {
    this.log(message, 'DEBUG');
  }

  static error(error: unknown): void {
    if (error instanceof Error) {
      this.log(error.message, 'ERROR');
    } else if (typeof error === 'string') {
      this.log(error, 'ERROR');
    }
  }
}
