import PaymentMethods from "../PaymentMethods";

export default interface PaymentMethodsResponse {
  msg: string;
  mstPaymentMethods: PaymentMethods[];
  total: number;
}
