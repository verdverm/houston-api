"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Role",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "RoleBinding",
    embedded: false
  },
  {
    name: "Email",
    embedded: false
  },
  {
    name: "LocalCredential",
    embedded: false
  },
  {
    name: "OAuthCredential",
    embedded: false
  },
  {
    name: "InviteToken",
    embedded: false
  },
  {
    name: "ServiceAccount",
    embedded: false
  },
  {
    name: "Workspace",
    embedded: false
  },
  {
    name: "Deployment",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA__ENDPOINT"]}`,
  secret: `${process.env["PRISMA__SECRET"]}`
});
exports.prisma = new exports.Prisma();
