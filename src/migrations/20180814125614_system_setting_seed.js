import config from "config";

const SYSTEM_SETTING_TABLE = "system_settings";

export async function up(knex) {
  const baseDomain = config.get("helm.baseDomain");

  const settings = [
    {
      key: "reply_email",
      value: `noreply@${baseDomain}`,
      category: "system"
    },
    {
      key: "company_name",
      value: `Astronomer`,
      category: "system"
    },
    {
      key: "user_confirmation",
      value: `true`,
      category: "authentication"
    },
    {
      key: "domain_whitelist",
      value: baseDomain,
      category: "authentication"
    }
  ];

  return Promise.all(
    settings.map(s => {
      s.created_at = new Date().toISOString();
      return knex(SYSTEM_SETTING_TABLE).insert(s);
    })
  );
}

export function down() {}
