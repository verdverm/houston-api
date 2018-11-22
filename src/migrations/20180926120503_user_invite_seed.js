import { SYSTEM_SETTING_PUBLIC_SIGNUP } from "../constants";

const PERMISSION_TABLE = "permissions";
const ROLE_PERMISSION_TABLE = "role_permission_map";
const ROLE_TABLE = "roles";
const SYSTEM_SETTING_TABLE = "system_settings";

async function insertSystemSettingIfNotExists(knex, record) {
  const setting = await knex.select().where("key", record.key);
  if (setting.length) {
    return;
  }
  return await knex.insert(record);
}

const scopedPermissions = {
  user: {
    user: {
      invite:
        "Requestor can invite another User into the platform within platform rules"
    }
  },
  global: {
    // Permissions given to a User without an association of the object in which they are interacting with. Those with system-wide access will be granted permissions within this context.
    user: {
      // An individual entity that has login credentials to access the system
      invite:
        "Requestor can invite another User into the platform disregarding platform rules"
    }
  }
};

const settings = [
  {
    key: SYSTEM_SETTING_PUBLIC_SIGNUP,
    value: false,
    category: "user"
  }
];

export async function up(knex) {
  let promises = [];

  // Insert permissions
  for (let scope in scopedPermissions) {
    if (!scopedPermissions.hasOwnProperty(scope)) {
      continue;
    }
    const inserts = [];
    for (let category in scopedPermissions[scope]) {
      if (!scopedPermissions[scope].hasOwnProperty(category)) {
        continue;
      }

      const payload = scopedPermissions[scope][category];

      for (let id in payload) {
        if (!payload.hasOwnProperty(id)) {
          continue;
        }
        const label = payload[id];
        let insertData = {
          id: `${scope}_${category}_${id}`,
          scope: scope,
          label: label,
          category: category,
          created_at: new Date().toISOString()
        };
        inserts.push(insertData);
      }
    }
    promises.push(knex(PERMISSION_TABLE).insert(inserts));
  }
  await Promise.all(promises);

  const adminRole = await knex(ROLE_TABLE)
    .where({
      label: "Full system permissions"
    })
    .first();
  const ownerRole = await knex(ROLE_TABLE)
    .where({
      label: "Workspace Owner"
    })
    .first();

  await knex(ROLE_PERMISSION_TABLE).insert({
    role_uuid: adminRole.uuid,
    permission_id: "global_user_invite",
    created_at: new Date().toISOString()
  });

  await knex(ROLE_PERMISSION_TABLE).insert({
    role_uuid: ownerRole.uuid,
    permission_id: "user_user_invite",
    created_at: new Date().toISOString()
  });

  promises = [];
  for (let setting of settings) {
    setting.created_at = new Date().toISOString();
    if (!setting.hasOwnProperty("is_encrypted")) {
      setting.is_encrypted = false;
    }
    promises.push(
      insertSystemSettingIfNotExists(knex(SYSTEM_SETTING_TABLE), setting)
    );
  }
  return Promise.all(promises);
}

export function down() {}
