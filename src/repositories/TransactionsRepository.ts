import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // Somando os Valores das Transações do Tipo income
    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((cont, { value }) => cont + value, 0);

    // Somando os Valores das Transações do Tipo outcome
    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((cont, { value }) => cont + value, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionsDTO): Transaction {
    const transition = new Transaction({ title, value, type });

    this.transactions.push(transition);

    return transition;
  }
}

export default TransactionsRepository;
