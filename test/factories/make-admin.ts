import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Admin, AdminProps } from "../../src/domain/identity-management/enterprise/entities/admin";

export function makeAdmin(override: Partial<AdminProps>, id?: UniqueEntityID) {
  const admin = Admin.create({
    name: 'felipe amorim',
    email: 'felipecastroo.ads@gmail.com',
    password: '123456'
  }, id)

  return admin
}