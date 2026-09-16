type HubspotFetchOptions = RequestInit & {
  searchParams?: Record<string, string | number | boolean>;
};

export async function hubspotFetch(path: string, options: HubspotFetchOptions = {}) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token) {
    throw new Error("HUBSPOT_ACCESS_TOKEN is not configured.");
  }

  const url = new URL(`https://api.hubapi.com${path}`);

  if (options.searchParams) {
    for (const [key, value] of Object.entries(options.searchParams)) {
      url.searchParams.set(key, String(value));
    }
  }

  const { searchParams, ...rest } = options;

  const response = await fetch(url, {
    ...rest,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(rest.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HubSpot request failed (${response.status}): ${text}`);
  }

  return response.json();
}

export async function fetchHubspotDeals() {
  return hubspotFetch("/crm/v3/objects/deals/search", {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [],
      properties: [
        "dealname",
        "dealstage",
        "pipeline",
        "hubspot_owner_id",
        "createdate",
        "closedate",
        "amount",
        "canal_de_aquisicao",
        "icp",
        "closed_lost_reason",
        "reuniao_realizada",
      ],
      limit: 100,
    }),
  });
}

export async function fetchHubspotTasks() {
  return hubspotFetch("/crm/v3/objects/tasks/search", {
    method: "POST",
    body: JSON.stringify({
      properties: ["hs_task_subject", "hs_task_status", "hs_task_due_date", "hs_task_completion_date"],
      limit: 100,
    }),
  });
}
