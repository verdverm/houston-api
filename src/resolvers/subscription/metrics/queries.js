// @PromQL
// Queries to gather data for a deployment from Prometheus
import moment from "moment";

// Query Options
const components = `scheduler|webserver|worker|flower|redis|pgbouncer|statsd`;
const duration = `[3m]`;

export default function queries(deployment, since, step) {
  // UNIX current time timestamp
  const now = moment().unix();

  // Formatted step
  const fstep = `[${step}s]`;

  // UNIX start timestamp
  const start = moment()
    .subtract(since, "minutes")
    .unix();

  // Query builders (Prom uses different endpoints for different metrics)
  const query = ql => `query?query=${encodeURI(ql)}&time=${now}`;
  const rangeQuery = ql =>
    `query_range?start=${start}&end=${now}&step=${step}s&query=${encodeURI(
      ql
    )}`;

  return [
    {
      name: "deploymentStatus",
      query: query(
        `sum by (release) (kube_pod_container_status_running{release=~"${deployment}"} and on(pod,namespace) kube_pod_labels{label_dag_id=""}) -
         count by (release) (kube_pod_container_status_running{release=~"${deployment}"} and on(pod,namespace) kube_pod_labels{label_dag_id=""})`
      )
    },
    {
      name: "schedulerHeartbeat",
      query: query(
        `round(rate(airflow_scheduler_heartbeat{deployment=~"${deployment}", type="counter"}${duration}) * 5)`
      )
    },
    {
      name: "maxPods",
      query: query(
        `sum(kube_resourcequota{resource="pods", type="hard", release=~"${deployment}"})`
      )
    },
    {
      name: "cpuMax",
      query: query(
        `sum(kube_resourcequota{resource="limits.cpu", type="hard", release=~"${deployment}"})`
      )
    },
    {
      name: "memoryMax",
      query: query(
        `sum(kube_resourcequota{resource="limits.memory", type="hard", release=~"${deployment}"})`
      )
    },
    {
      name: "runningPods",
      query: query(
        `sum(kube_resourcequota{resource="pods", type="used", release=~"${deployment}"}) /
         sum(kube_resourcequota{resource="pods", type="hard", release=~"${deployment}"}) * 100`
      )
    },
    {
      name: "reservedCPU",
      query: query(
        `sum(kube_resourcequota{resource="limits.cpu", type="used", release=~"${deployment}"}) /
         sum(kube_resourcequota{resource="limits.cpu", type="hard", release=~"${deployment}"}) * 100`
      )
    },
    {
      name: "reservedMemory",
      query: query(
        `sum(kube_resourcequota{resource="limits.memory", type="used", release=~"${deployment}"}) /
         sum(kube_resourcequota{resource="limits.memory", type="hard", release=~"${deployment}"}) * 100`
      )
    },
    {
      name: "heartbeat",
      query: rangeQuery(
        `sum(airflow_scheduler_heartbeat{deployment=~"${deployment}"})`
      )
    },
    {
      name: "dagCount",
      query: rangeQuery(`sum(airflow_dagbag_size{deployment=~"${deployment}"})`)
    },
    {
      name: "zombieCount",
      query: rangeQuery(
        `sum(airflow_zombies_killed{deployment=~"${deployment}"})`
      )
    },
    {
      name: "taskSuccessCount",
      query: rangeQuery(
        `sum(airflow_ti_successes{deployment=~"${deployment}"})`
      )
    },
    {
      name: "taskFailCount",
      query: rangeQuery(`sum(airflow_ti_failures{deployment=~"${deployment}"})`)
    },
    {
      name: "taskSuccessRate",
      query: rangeQuery(
        `rate(airflow_operator_successes{deployment=~"${deployment}"}${duration})`
      )
    },
    {
      name: "taskFailRate",
      query: rangeQuery(
        `rate(airflow_operator_failures{deployment=~"${deployment}"}${duration})`
      )
    },
    {
      name: "totalDatabaseConnections",
      query: rangeQuery(
        `sum(pgbouncer_exporter_database_current_connections{name!="pgbouncer", deployment=~"${deployment}"})`
      )
    },
    {
      name: "totalWaitingClients",
      query: rangeQuery(
        `sum(pgbouncer_exporter_pools_waiting_clients{database!="pgbouncer", deployment=~"${deployment}"})`
      )
    },
    {
      name: "cpuUsage",
      query: rangeQuery(
        `rate(container_cpu_user_seconds_total{component_name=~".*(${components}).*", deployment=~"${deployment}"}${duration}) * 100`
      )
    },
    {
      name: "memoryUsage",
      query: rangeQuery(
        `container_memory_usage_bytes{component_name=~".*(${components}).*", deployment=~"${deployment}"}`
      )
    },
    {
      name: "networkRx",
      query: rangeQuery(
        `rate(container_network_receive_bytes_total{component_name=~".*(${components})", deployment=~"${deployment}"}${duration})`
      )
    },
    {
      name: "networkTx",
      query: rangeQuery(
        `rate(container_network_transmit_bytes_total{component_name=~".*(${components})", deployment=~"${deployment}"}${duration})`
      )
    },
    {
      name: "coreContainerStatus",
      query: query(
        `sort_desc(max by (container, pod, reason) (
          max by (container, pod) (
            sort_desc(kube_pod_container_status_waiting{release=~"${deployment}"}
            and on(pod,namespace) kube_pod_labels{label_dag_id=""})
          )
          or max by (container, reason) (
            sort_desc(kube_pod_container_status_waiting_reason{release=~"${deployment}"}==1 and on(pod,namespace) kube_pod_labels{label_dag_id=""})
          )
          or max by (container, reason) (
            sort_desc(kube_pod_container_status_terminated_reason{release=~"${deployment}"}==1 and on(pod,namespace) kube_pod_labels{label_dag_id=""})
          ))
        )`
      )
    },
    {
      name: "taskStatus",
      query: query(
        `sort_desc(max by (container, pod, reason) (
          max by (container, pod) (
          sort_desc(kube_pod_container_status_waiting{release=~"${deployment}"} and on(pod,namespace) kube_pod_labels{label_dag_id!=""})  )
          or max by (container, reason) (
          sort_desc(kube_pod_container_status_waiting_reason{release=~"${deployment}"}==1 and on(pod,namespace) kube_pod_labels{label_dag_id!=""}) )
          or max by (container, reason) (sort_desc(kube_pod_container_status_terminated_reason{release=~"${deployment}"}==1 and on(pod,namespace) kube_pod_labels{label_dag_id!=""}) )))`
      )
    },
    {
      name: "runningTasks",
      query: rangeQuery(
        `airflow_executor_running_tasks{deployment=~"${deployment}"}`
      )
    },
    {
      name: "queuedTasks",
      query: rangeQuery(
        `airflow_executor_queued_tasks{deployment=~"${deployment}"}`
      )
    },
    {
      name: "failedTasks",
      query: rangeQuery(
        `idelta(airflow_ti_failures{deployment=~"${deployment}"}${fstep})`
      )
    },
    {
      name: "successfulTasks",
      query: rangeQuery(
        `idelta(airflow_ti_successes{deployment=~"${deployment}"}${fstep})`
      )
    }
  ];
}
