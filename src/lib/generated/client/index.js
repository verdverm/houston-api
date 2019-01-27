"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Deployment",
    embedded: false
  },
  {
    name: "Email",
    embedded: false
  },
  {
    name: "InviteToken",
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
    name: "Role",
    embedded: false
  },
  {
    name: "RoleBinding",
    embedded: false
  },
  {
    name: "ServiceAccount",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Workspace",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
