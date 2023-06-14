export default interface AccountInfo {
  accountId?: number;
  accountName? :string;
  extAccountId?: number;
  emailAddress? :string;
  accountStatus?: number;
  isSystemManager?: boolean;
  createdAt?: string,
  modifiedAt?: string,
  deletedAt?: string,
  isDeleted?: boolean,
}
