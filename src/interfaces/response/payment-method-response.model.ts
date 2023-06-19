import PaymentMethods from "../PaymentMethods";

export default interface PaymentMethodsResponse {
  message: string;
  mstPaymentMethods: PaymentMethods[];
  total: number;
  status: number;
}
