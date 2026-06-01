const LAST_OPENED_MODULE_KEY = "aquaHomes.lastOpenedModule";
const DEMO_DATA_KEY = "aquaHomes.structuredDemoData";
const RECENT_ACTIVITY_KEY = "aquaHomes.structuredRecentActivity";
const SELECTED_PROJECT_KEY = "aquaHomes.selectedProjectName";
const INVESTOR_VISIBILITY_KEY = "aquaHomes.aquabonaInvestorVisibility";
const ACCOUNTING_REVIEW_KEY = "aquaHomes.accountingReview";
const MAX_RECENT_ACTIVITY = 10;
const RECEIPT_REVIEW_STATUSES = ["Needs Review", "Coded", "Accounting Hold"];
const PAYROLL_PREP_STATUSES = ["Draft", "Office Review", "Approved Hold"];
const INVENTORY_TOOL_STATUSES = [
  "Available",
  "Checked Out",
  "Assigned to Job",
  "Lost / Damaged",
  "Needs Review",
];
const MAINTENANCE_PRIORITIES = ["Low", "Normal", "Urgent"];
const MAINTENANCE_TRADES = [
  "Maintenance",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Carpentry",
];
const MAINTENANCE_DISPATCH_STATUSES = [
  "New Request",
  "Approved",
  "Dispatched",
  "En Route",
  "On Site",
  "Complete",
  "Office Reconciliation Hold",
];
const ACTIVE_MAINTENANCE_STATUSES = ["Dispatched", "En Route", "On Site"];
const SCHEDULE_TASK_PRIORITIES = ["Low", "Normal", "High", "Urgent"];
const SCHEDULE_TASK_STATUSES = [
  "Not Started",
  "In Progress",
  "Waiting on Material",
  "Waiting on Inspection",
  "Complete",
  "Office Review",
];
const SCHEDULE_TASK_LOCK_NOTE =
  "Live crew dispatch, GPS, external calendar sync, and notifications are locked until backend/security gates are complete.";
const WALKTHROUGH_READINESS_STATUSES = [
  "Draft Capture",
  "Needs Office Review",
  "Ready for Estimate",
  "Sent to Proposal",
];
const CUSTOMER_PORTAL_REQUEST_TYPES = [
  "General Question",
  "Change Order Request",
  "Schedule Question",
  "Photo / Proof Request",
  "Maintenance Request",
  "Payment / Deposit Question",
];
const CUSTOMER_PORTAL_APPROVAL_STATUSES = [
  "New",
  "Office Review",
  "Waiting on Owner",
  "Approved",
  "Closed",
];
const CUSTOMER_PORTAL_LOCK_NOTE =
  "Live customer messaging, payment collection, and sensitive customer storage are locked until backend/security gates are complete.";
const ESTIMATE_TIERS = ["Standard", "Premium", "Luxury"];
const ESTIMATE_STATUSES = [
  "Draft",
  "Office Review",
  "Sent to Customer",
  "Approved",
  "Change Order",
  "Closed",
];
const ESTIMATE_LOCK_NOTE =
  "Live e-signature, deposits, payment collection, and accounting impact are locked until backend/security gates are complete.";
const ACCOUNTING_REVIEW_STATUSES = [
  "Draft Review",
  "Needs Receipts",
  "Office Review",
  "Owner Approval Hold",
  "Ready for Accountant",
];
const ACCOUNTING_REVIEW_LOCK_NOTE =
  "Live accounting sync, ledger posting, tax filing, and P&L posting are locked until backend/security/provider gates are complete.";
const OWNER_APPROVAL_TYPES = [
  "Estimate Approval",
  "Change Order",
  "Receipt Review",
  "Payroll Hold",
  "Maintenance Dispatch",
  "Investor Visibility",
  "Accounting Review",
  "Document Approval",
  "Other",
];
const OWNER_APPROVAL_STATUSES = [
  "Pending",
  "Office Review",
  "Owner Approved",
  "Owner Rejected",
  "Accounting Hold",
  "Completed",
];
const OWNER_APPROVAL_LOCK_NOTE =
  "Live approvals, payments, payroll release, and accounting impact are locked until backend/security/provider gates are complete.";
const DOCUMENT_TYPES = [
  "Scope of Work",
  "Contract",
  "Permit",
  "Inspection",
  "Insurance",
  "Photo Proof",
  "Receipt",
  "Closeout",
  "Other",
];
const DOCUMENT_STATUSES = [
  "Draft",
  "Uploaded",
  "Needs Review",
  "Approved",
  "Missing",
  "Archived",
];
const DOCUMENT_LOCK_NOTE =
  "Live document storage, customer-sensitive files, and cloud sync are locked until backend/security gates are complete.";
const BUG_SEVERITIES = ["Low", "Medium", "High", "Critical"];
const BUG_STATUSES = [
  "New",
  "Investigating",
  "Fix Planned",
  "Fixed",
  "Retest Needed",
  "Closed",
];
const BUG_QA_LOCK_NOTE =
  "This is a local prototype QA log only. Live bug reporting, user accounts, attachments, and production issue tracking are locked until backend/security gates are complete.";
const INVESTOR_VISIBILITY_CATEGORIES = [
  "Scope of Work",
  "Project status",
  "Photos / Proof",
  "Receipts",
  "Permits / Inspections",
  "Insurance documents",
  "Inventory proof",
  "Change orders",
  "Closeout",
];

const modules = [
  {
    name: "Projects",
    description:
      "Track active builds, milestones, and next actions across Aqua Homes projects.",
  },
  {
    name: "Receipts",
    description:
      "Collect job receipts and keep spend details ready for review.",
  },
  {
    name: "Payroll Prep",
    description:
      "Stage crew hours, notes, and payroll handoff items before processing.",
  },
  {
    name: "Accounting Review",
    description:
      "Review financial checkpoints, reconciliations, and open accounting questions.",
  },
  {
    name: "Owner Approvals / Review Queue",
    description:
      "Stage owner approvals, office review holds, and accounting-sensitive decisions in local demo storage.",
  },
  {
    name: "Maintenance + HVAC",
    description:
      "Monitor service items, HVAC follow-ups, and recurring maintenance needs.",
  },
  {
    name: "Schedule / Tasks",
    description:
      "Stage crew tasks, due dates, priority, and office status in local demo storage.",
  },
  {
    name: "Inventory / Tools",
    description:
      "Keep lightweight visibility into tools, supplies, and inventory requests.",
  },
  {
    name: "Field Walkthrough",
    description:
      "Capture walkthrough notes, punch items, and jobsite observations.",
  },
  {
    name: "Aquabona Investor Portal",
    description:
      "Open a simple hub for investor updates, documents, and AquaBona context.",
  },
  {
    name: "Customer / Homeowner Portal",
    description:
      "Stage homeowner requests, approval status, and office follow-up notes in local demo storage.",
  },
  {
    name: "Estimates / Proposals / Change Orders",
    description:
      "Stage lightweight estimates, proposal tiers, and change-order status in local demo storage.",
  },
  {
    name: "Job Documents / Evidence Binder",
    description:
      "Stage job document records, evidence status, and closeout proof in local demo storage.",
  },
  {
    name: "Bug Capture / QA Issue Log",
    description:
      "Log prototype QA issues, severity, status, steps, and follow-up notes.",
  },
];

const demoDefaults = {
  projects: [
    {
      name: "Canal House Retrofit",
      status: "Active",
      budget: "185000",
      scope:
        "Kitchen refresh, dock repairs, punch list closeout, and final owner walkthrough.",
      nextTask: "Confirm material delivery window and crew start time.",
      proof: "Before photos saved in demo notes; completion photos pending.",
      permit: "Permit check placeholder for city inspection follow-up.",
      notes:
        "Keep owner updates lightweight until backend document storage is approved.",
      tags: "Aquabona, investor-visible",
      aquabona: true,
      investorVisible: true,
    },
  ],
  receipts: [
    {
      vendor: "Harbor Supply",
      project: "Canal House Retrofit",
      amount: "742.18",
      status: "Needs Review",
    },
  ],
  payrollPrep: [
    {
      workerName: "Mia Rivera",
      project: "Canal House Retrofit",
      hours: "6.5",
      rate: "38",
      status: "Draft",
    },
    {
      workerName: "Jordan Lee",
      project: "Canal House Retrofit",
      hours: "8",
      rate: "42",
      status: "Office Review",
    },
  ],
  maintenancePlusHvac: [
    {
      title: "Replace upstairs return filter",
      propertyProject: "Canal House Retrofit",
      priority: "Normal",
      tradeType: "HVAC",
      assignedTechnician: "Jordan Lee",
      status: "New Request",
      estimatedCost: "185",
    },
    {
      title: "Kitchen sink supply-line check",
      propertyProject: "Canal House Retrofit",
      priority: "Urgent",
      tradeType: "Plumbing",
      assignedTechnician: "Mia Rivera",
      status: "Dispatched",
      estimatedCost: "420",
    },
  ],
  scheduleTasks: [
    {
      title: "Confirm cabinet delivery window",
      propertyProject: "Canal House Retrofit",
      assignedPerson: "Mia Rivera",
      dueDate: "2026-06-05",
      priority: "High",
      status: "In Progress",
    },
    {
      title: "Book rough-in inspection hold",
      propertyProject: "Canal House Retrofit",
      assignedPerson: "Jordan Lee",
      dueDate: "2026-06-07",
      priority: "Urgent",
      status: "Waiting on Inspection",
    },
  ],
  inventoryTools: [
    {
      name: "Laser Level",
      tag: "AH-204",
      holder: "Mia",
      project: "Canal House Retrofit",
      status: "Checked Out",
    },
    {
      name: "Submersible Pump",
      tag: "QR-AH-118",
      holder: "Truck 2",
      project: "Dock Repair Hold",
      status: "Available",
    },
  ],
  fieldWalkthrough: [
    {
      projectProperty: "Canal House Retrofit",
      customerNotes:
        "Owner wants the dock repair priced with a kitchen punch-list alternate.",
      voiceNoteSummary:
        "Captured demo summary from field conversation; live voice capture remains locked.",
      measurementNotes:
        "Verify railing length, cabinet opening, and sink supply-line clearance.",
      scopeDraft:
        "Draft repair scope for office review before estimate preparation.",
      photoProofPlaceholder:
        "Placeholder for before photos, progress proof, and completion signoff notes.",
      readinessStatus: "Needs Office Review",
    },
  ],
  customerPortal: [
    {
      customerName: "Avery Morgan",
      projectProperty: "Canal House Retrofit",
      requestType: "Schedule Question",
      messageNotes:
        "Owner asks whether the dock repair walkthrough can happen before the kitchen punch-list review.",
      approvalStatus: "Office Review",
    },
  ],
  estimatesProposals: [
    {
      projectProperty: "Canal House Retrofit",
      customerInvestor: "Avery Morgan",
      estimateTitle: "Kitchen punch list with dock repair alternate",
      scopeSummary:
        "Standard repair scope for kitchen closeout, dock walkthrough pricing, and owner review.",
      tier: "Premium",
      amount: "28500",
      status: "Office Review",
    },
    {
      projectProperty: "Canal House Retrofit",
      customerInvestor: "Aquabona Holdings",
      estimateTitle: "Dock repair change order",
      scopeSummary:
        "Change-order placeholder for dock railing repairs and material verification.",
      tier: "Luxury",
      amount: "12400",
      status: "Change Order",
    },
  ],
  ownerApprovals: [
    {
      title: "Kitchen punch list estimate approval",
      projectProperty: "Canal House Retrofit",
      approvalType: "Estimate Approval",
      amount: "28500",
      requestedBy: "Avery Morgan",
      status: "Pending",
      notes:
        "Demo approval item only. Owner approval workflow remains locked until backend/security/provider gates are complete.",
    },
    {
      title: "Dock repair change order review",
      projectProperty: "Canal House Retrofit",
      approvalType: "Change Order",
      amount: "12400",
      requestedBy: "Aqua Homes Office",
      status: "Office Review",
      notes:
        "Confirm scope, amount, and accounting hold before live approval routing is enabled.",
    },
    {
      title: "Receipt packet accounting hold",
      projectProperty: "Canal House Retrofit",
      approvalType: "Accounting Review",
      amount: "742.18",
      requestedBy: "Harbor Supply",
      status: "Accounting Hold",
      notes:
        "Placeholder for office reconciliation and owner visibility review.",
    },
  ],
  jobDocuments: [
    {
      title: "Canal House permit packet",
      projectProperty: "Canal House Retrofit",
      documentType: "Permit",
      status: "Needs Review",
      notes:
        "Demo record only. Confirm permit proof and inspection linkage after backend gates are approved.",
    },
    {
      title: "Kitchen progress photo proof",
      projectProperty: "Canal House Retrofit",
      documentType: "Photo Proof",
      status: "Uploaded",
      notes:
        "Placeholder evidence note for owner closeout review; no live files are stored here.",
    },
    {
      title: "Insurance certificate follow-up",
      projectProperty: "Canal House Retrofit",
      documentType: "Insurance",
      status: "Missing",
      notes: "Demo reminder to request current insurance document from office.",
    },
  ],
  bugCapture: [
    {
      title: "Tighten mobile spacing on project card",
      moduleArea: "Projects dashboard",
      severity: "Medium",
      status: "New",
      stepsToReproduce:
        "Open the structured starter on a narrow mobile viewport and review project card spacing.",
      notes: "Check the dashboard cards after the next prototype pass.",
    },
  ],
};

const dashboardSummaryItems = [
  {
    label: "Active Projects",
    storageKey: "projects",
    helper: "Projects marked active",
    getCount: (items) =>
      items.filter((item) => item.status?.toLowerCase() === "active").length,
  },
  {
    label: "Receipts Review",
    storageKey: "receipts",
    helper: "Receipts needing review",
    getCount: (items) =>
      items.filter((item) => getReceiptStatus(item) === "Needs Review").length,
  },
  {
    label: "Maintenance / HVAC",
    storageKey: "maintenancePlusHvac",
    helper: "Open service requests",
  },
  {
    label: "Schedule Tasks",
    storageKey: "scheduleTasks",
    helper: "Crew task records",
  },
  {
    label: "Inventory / Tools",
    storageKey: "inventoryTools",
    helper: "Tracked items",
  },
  {
    label: "Field Captures",
    storageKey: "fieldWalkthrough",
    helper: "Walkthrough records",
  },
  {
    label: "Customer Requests",
    storageKey: "customerPortal",
    helper: "Homeowner portal records",
  },
  {
    label: "Estimates",
    storageKey: "estimatesProposals",
    helper: "Proposals and change orders",
  },
  {
    label: "Owner Approvals",
    storageKey: "ownerApprovals",
    helper: "Approval queue items",
  },
  {
    label: "Job Documents",
    storageKey: "jobDocuments",
    helper: "Evidence binder records",
  },
  {
    label: "Bug Reports",
    storageKey: "bugCapture",
    helper: "QA issues in local prototype log",
  },
];

const demoModules = {
  projects: {
    storageKey: "projects",
    eyebrow: "Demo project log",
    submitLabel: "Save Project",
    fields: [
      {
        name: "name",
        label: "Project name",
        placeholder: "Poolside Residence",
        required: true,
      },
      {
        name: "status",
        label: "Status",
        placeholder: "Active",
        required: true,
      },
      {
        name: "budget",
        label: "Budget",
        placeholder: "250000",
        type: "number",
        required: true,
      },
      {
        name: "scope",
        label: "Scope note",
        placeholder: "Interior punch list and exterior repairs",
      },
      {
        name: "nextTask",
        label: "Next task",
        placeholder: "Schedule inspection walkthrough",
      },
      {
        name: "investorVisible",
        label: "Investor visible",
        options: ["No", "Yes"],
      },
      {
        name: "tags",
        label: "Tags",
        placeholder: "Aquabona, investor-visible",
      },
    ],
    empty: "No demo projects yet.",
    format: (item) => ({
      title: item.name,
      meta: `${item.status} · ${formatCurrency(item.budget)}${isInvestorVisibleProject(item) ? " · investor visible" : ""}`,
    }),
  },
  receipts: {
    storageKey: "receipts",
    eyebrow: "Demo receipt inbox",
    submitLabel: "Save Receipt",
    fields: [
      {
        name: "vendor",
        label: "Vendor",
        placeholder: "Harbor Supply",
        required: true,
      },
      {
        name: "project",
        label: "Project",
        placeholder: "Canal House Retrofit",
        required: true,
      },
      {
        name: "amount",
        label: "Amount",
        placeholder: "742.18",
        type: "number",
        required: true,
      },
      {
        name: "status",
        label: "Review status",
        placeholder: "Needs Review",
        required: true,
      },
    ],
    empty: "No demo receipts yet.",
    format: (item) => ({
      title: item.vendor,
      meta: `${item.project} · ${formatCurrency(item.amount)} · ${item.status}`,
    }),
  },
  "payroll-prep": {
    storageKey: "payrollPrep",
    eyebrow: "Demo payroll prep",
    submitLabel: "Save Labor Record",
    fields: [
      {
        name: "workerName",
        label: "Worker name",
        placeholder: "Mia Rivera",
        required: true,
      },
      {
        name: "project",
        label: "Project",
        placeholder: "Canal House Retrofit",
        required: true,
      },
      {
        name: "hours",
        label: "Hours",
        placeholder: "8",
        type: "number",
        step: "0.25",
        min: "0",
        required: true,
      },
      {
        name: "rate",
        label: "Rate",
        placeholder: "42",
        type: "number",
        step: "0.01",
        min: "0",
        required: true,
      },
      {
        name: "status",
        label: "Status",
        options: PAYROLL_PREP_STATUSES,
        required: true,
      },
    ],
    empty: "No demo payroll/labor records yet.",
    format: (item) => ({
      title: item.workerName,
      meta: `${item.project} · ${Number(item.hours) || 0} hrs × ${formatCurrency(item.rate)} · ${formatCurrency(getLaborCost(item))} · ${getPayrollStatus(item)}`,
    }),
  },
  "maintenance-plus-hvac": {
    storageKey: "maintenancePlusHvac",
    eyebrow: "Demo dispatch board",
    submitLabel: "Save Dispatch Request",
    fields: [
      {
        name: "title",
        label: "Request title",
        placeholder: "Inspect air handler",
        required: true,
      },
      {
        name: "propertyProject",
        label: "Property / project",
        placeholder: "Canal House Retrofit",
        required: true,
      },
      {
        name: "priority",
        label: "Priority",
        options: MAINTENANCE_PRIORITIES,
        required: true,
      },
      {
        name: "tradeType",
        label: "Trade type",
        options: MAINTENANCE_TRADES,
        required: true,
      },
      {
        name: "assignedTechnician",
        label: "Assigned technician",
        placeholder: "Jordan Lee",
        required: true,
      },
      {
        name: "status",
        label: "Dispatch status",
        options: MAINTENANCE_DISPATCH_STATUSES,
        required: true,
      },
      {
        name: "estimatedCost",
        label: "Estimated repair cost",
        placeholder: "250",
        type: "number",
        step: "0.01",
        min: "0",
        required: true,
      },
    ],
    empty: "No demo maintenance/HVAC dispatch requests yet.",
    format: (item) => ({
      title: getMaintenanceTitle(item),
      meta: `${getMaintenancePriority(item)} priority · ${getMaintenanceTrade(item)} · ${getMaintenanceStatus(item)} · ${formatCurrency(item.estimatedCost)}`,
    }),
  },

  "schedule-tasks": {
    storageKey: "scheduleTasks",
    eyebrow: "Schedule / Tasks",
    submitLabel: "Save Task",
    fields: [
      {
        name: "title",
        label: "Task title",
        placeholder: "Confirm cabinet delivery window",
        required: true,
      },
      {
        name: "propertyProject",
        label: "Project / property",
        placeholder: "Canal House Retrofit",
        projectOptions: true,
        required: true,
      },
      {
        name: "assignedPerson",
        label: "Assigned person",
        placeholder: "Mia Rivera",
        required: true,
      },
      {
        name: "dueDate",
        label: "Due date",
        type: "date",
        required: true,
      },
      {
        name: "priority",
        label: "Priority",
        options: SCHEDULE_TASK_PRIORITIES,
        required: true,
      },
      {
        name: "status",
        label: "Status",
        options: SCHEDULE_TASK_STATUSES,
        required: true,
      },
    ],
    empty: "No demo schedule tasks yet.",
    format: (item) => ({
      title: getScheduleTaskTitle(item),
      meta: `${getScheduleTaskProject(item)} · ${getScheduleTaskAssignee(item)} · ${formatScheduleDueDate(item.dueDate)} · ${getScheduleTaskPriority(item)} · ${getScheduleTaskStatus(item)}`,
    }),
  },

  "field-walkthrough": {
    storageKey: "fieldWalkthrough",
    eyebrow: "Field Walkthrough / Jobsite Capture",
    submitLabel: "Save Walkthrough",
    fields: [
      {
        name: "projectProperty",
        label: "Project / property",
        placeholder: "Canal House Retrofit",
        projectOptions: true,
        required: true,
      },
      {
        name: "customerNotes",
        label: "Customer notes",
        placeholder: "Owner priorities, access notes, and requested alternates",
        multiline: true,
      },
      {
        name: "voiceNoteSummary",
        label: "Voice note summary",
        placeholder: "Typed demo summary of field voice notes",
        multiline: true,
      },
      {
        name: "measurementNotes",
        label: "Measurement notes",
        placeholder: "Measurements, dimensions, and verification reminders",
        multiline: true,
      },
      {
        name: "scopeDraft",
        label: "Scope draft",
        placeholder: "Initial field scope to review with the office",
        multiline: true,
      },
      {
        name: "photoProofPlaceholder",
        label: "Photo / proof placeholder text",
        placeholder: "Before, progress, and completion proof placeholders",
        multiline: true,
      },
      {
        name: "readinessStatus",
        label: "Estimate readiness status",
        options: WALKTHROUGH_READINESS_STATUSES,
        required: true,
      },
    ],
    empty: "No demo walkthrough captures yet.",
    format: (item) => ({
      title: getWalkthroughProject(item),
      meta: `${getWalkthroughStatus(item)} · ${item.scopeDraft || item.customerNotes || "Capture notes pending"}`,
    }),
  },
  "customer-homeowner-portal": {
    storageKey: "customerPortal",
    eyebrow: "Customer / Homeowner Portal",
    submitLabel: "Save Customer Request",
    fields: [
      {
        name: "customerName",
        label: "Customer name",
        placeholder: "Avery Morgan",
        required: true,
      },
      {
        name: "projectProperty",
        label: "Project / property",
        placeholder: "Canal House Retrofit",
        projectOptions: true,
        required: true,
      },
      {
        name: "requestType",
        label: "Portal request type",
        options: CUSTOMER_PORTAL_REQUEST_TYPES,
        required: true,
      },
      {
        name: "messageNotes",
        label: "Message / request notes",
        placeholder: "Customer question, request context, or office follow-up notes",
        multiline: true,
        required: true,
      },
      {
        name: "approvalStatus",
        label: "Approval status",
        options: CUSTOMER_PORTAL_APPROVAL_STATUSES,
        required: true,
      },
    ],
    empty: "No customer portal demo requests yet.",
    format: (item) => ({
      title: getCustomerPortalTitle(item),
      meta: `${getCustomerPortalProject(item)} · ${getCustomerPortalRequestType(item)} · ${getCustomerPortalStatus(item)}`,
    }),
  },
  "estimates-proposals-change-orders": {
    storageKey: "estimatesProposals",
    eyebrow: "Estimates / Proposals / Change Orders",
    submitLabel: "Save Estimate",
    fields: [
      {
        name: "projectProperty",
        label: "Project / property",
        placeholder: "Canal House Retrofit",
        projectOptions: true,
        required: true,
      },
      {
        name: "customerInvestor",
        label: "Customer / investor",
        placeholder: "Avery Morgan or Aquabona Holdings",
        required: true,
      },
      {
        name: "estimateTitle",
        label: "Estimate title",
        placeholder: "Kitchen refresh proposal",
        required: true,
      },
      {
        name: "scopeSummary",
        label: "Scope summary",
        placeholder: "Scope, alternates, exclusions, and review notes",
        multiline: true,
        required: true,
      },
      {
        name: "tier",
        label: "Tier",
        options: ESTIMATE_TIERS,
        required: true,
      },
      {
        name: "amount",
        label: "Amount",
        placeholder: "25000",
        type: "number",
        step: "0.01",
        min: "0",
        required: true,
      },
      {
        name: "status",
        label: "Status",
        options: ESTIMATE_STATUSES,
        required: true,
      },
    ],
    empty: "No estimate, proposal, or change-order demo records yet.",
    format: (item) => ({
      title: getEstimateTitle(item),
      meta: `${getEstimateProject(item)} · ${getEstimateTier(item)} · ${formatCurrency(item.amount)} · ${getEstimateStatus(item)}`,
    }),
  },
  inventoryTools: {
    storageKey: "inventoryTools",
    eyebrow: "Inventory / Tool Checkout",
    submitLabel: "Save Tool / Item",
    fields: [
      {
        name: "name",
        label: "Item / tool name",
        placeholder: "Hammer Drill",
        required: true,
      },
      {
        name: "tag",
        label: "Tag / QR code",
        placeholder: "AH-312",
        required: true,
      },
      {
        name: "holder",
        label: "Holder / worker / truck",
        placeholder: "Jordan or Truck 2",
        required: true,
      },
      {
        name: "project",
        label: "Project",
        placeholder: "Canal House Retrofit",
        required: true,
      },
      {
        name: "status",
        label: "Status",
        options: INVENTORY_TOOL_STATUSES,
        required: true,
      },
    ],
    empty: "No demo tools or inventory yet.",
    format: (item) => ({
      title: item.name,
      meta: `${item.tag} · ${item.holder} · ${item.project || "Unassigned project"} · ${getInventoryToolStatus(item)}`,
    }),
  },
  "owner-approvals-review-queue": {
    storageKey: "ownerApprovals",
    eyebrow: "Owner Approvals / Review Queue",
    submitLabel: "Save Approval Item",
    fields: [
      {
        name: "title",
        label: "Approval item title",
        placeholder: "Kitchen punch list estimate approval",
        required: true,
      },
      {
        name: "projectProperty",
        label: "Project / property",
        placeholder: "Canal House Retrofit",
        projectOptions: true,
        required: true,
      },
      {
        name: "approvalType",
        label: "Approval type",
        options: OWNER_APPROVAL_TYPES,
        required: true,
      },
      {
        name: "amount",
        label: "Amount",
        placeholder: "25000",
        type: "number",
        step: "0.01",
        min: "0",
        required: true,
      },
      {
        name: "requestedBy",
        label: "Requested by",
        placeholder: "Aqua Homes Office",
        required: true,
      },
      {
        name: "status",
        label: "Status",
        options: OWNER_APPROVAL_STATUSES,
        required: true,
      },
      {
        name: "notes",
        label: "Notes",
        placeholder: "Owner review notes, office conditions, and accounting hold context",
        multiline: true,
      },
    ],
    empty: "No owner approval demo records yet.",
    format: (item) => ({
      title: getOwnerApprovalTitle(item),
      meta: `${getOwnerApprovalProject(item)} · ${getOwnerApprovalType(item)} · ${formatCurrency(item.amount)} · ${getOwnerApprovalStatus(item)}`,
    }),
  },
  "job-documents-evidence-binder": {
    storageKey: "jobDocuments",
    eyebrow: "Job Documents / Evidence Binder",
    submitLabel: "Save Document Record",
    fields: [
      {
        name: "title",
        label: "Document title",
        placeholder: "Signed scope of work",
        required: true,
      },
      {
        name: "projectProperty",
        label: "Project / property",
        placeholder: "Canal House Retrofit",
        projectOptions: true,
        required: true,
      },
      {
        name: "documentType",
        label: "Document type",
        options: DOCUMENT_TYPES,
        required: true,
      },
      {
        name: "status",
        label: "Status",
        options: DOCUMENT_STATUSES,
        required: true,
      },
      {
        name: "notes",
        label: "Notes",
        placeholder: "Add review notes, source, deadline, or closeout context",
        multiline: true,
      },
    ],
    empty: "No job document demo records yet.",
    format: (item) => ({
      title: getDocumentTitle(item),
      meta: `${getDocumentProject(item)} · ${getDocumentType(item)} · ${getDocumentStatus(item)}`,
    }),
  },
  "bug-capture-qa-issue-log": {
    storageKey: "bugCapture",
    eyebrow: "Bug Capture / QA Issue Log",
    submitLabel: "Save Bug",
    fields: [
      {
        name: "title",
        label: "Bug title",
        placeholder: "Navigation label wraps",
        required: true,
      },
      {
        name: "moduleArea",
        label: "Module / area",
        placeholder: "Projects dashboard",
        required: true,
      },
      {
        name: "severity",
        label: "Severity",
        options: BUG_SEVERITIES,
        required: true,
      },
      {
        name: "status",
        label: "Status",
        options: BUG_STATUSES,
        required: true,
      },
      {
        name: "stepsToReproduce",
        label: "Steps to reproduce",
        placeholder:
          "1. Open the module\n2. Trigger the issue\n3. Confirm the unexpected result",
        multiline: true,
        required: true,
      },
      {
        name: "notes",
        label: "Notes",
        placeholder: "Add QA context, expected result, or follow-up notes",
        multiline: true,
      },
    ],
    empty: "No demo bugs yet.",
    format: (item) => ({
      title: getBugTitle(item),
      meta: `${getBugModuleArea(item)} · ${getBugSeverity(item)} · ${getBugStatus(item)} · ${item.notes || item.stepsToReproduce || "Notes pending"}`,
    }),
  },
};

const navButtons = document.querySelectorAll(".bottom-nav button");
const dashboardSummary = document.querySelector("[data-dashboard-summary]");
const aiInsightsList = document.querySelector("[data-ai-insights]");
const refreshInsights = document.querySelector("[data-refresh-insights]");
const aiInsightsUpdated = document.querySelector("[data-ai-insights-updated]");
const activityList = document.querySelector("[data-activity-list]");
const clearActivity = document.querySelector("[data-clear-activity]");
const cardGrid = document.querySelector("[data-module-grid]");
const detailPanel = document.querySelector("[data-module-detail]");
const detailTitle = document.querySelector("[data-module-title]");
const detailDescription = document.querySelector("[data-module-description]");
const detailClose = document.querySelector("[data-module-close]");
const detailDemo = document.querySelector("[data-module-demo]");
const backupJson = document.querySelector("[data-backup-json]");
const backupStatus = document.querySelector("[data-backup-status]");
const exportDemoData = document.querySelector("[data-export-demo]");
const importDemoData = document.querySelector("[data-import-demo]");
const backupResetDemoData = document.querySelector("[data-backup-reset]");
const resetDemoData = document.querySelector("[data-reset-demo]");

let demoData = loadDemoData();
let recentActivity = loadRecentActivity();
let investorVisibility = loadInvestorVisibility();
let accountingReview = loadAccountingReview();
let activeModule = null;
let selectedProjectName = readLocalStorage(SELECTED_PROJECT_KEY);

const getModuleId = (name) =>
  name
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatCurrency(value) {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "$0";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

function readLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Keep the shell usable if localStorage is unavailable.
  }
}

function cloneDemoDefaults() {
  return JSON.parse(JSON.stringify(demoDefaults));
}

function slugifyLabel(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getProjectTags(project) {
  const source = Array.isArray(project?.tags)
    ? project.tags.join(",")
    : (project?.tags ?? project?.tag ?? "");

  return String(source)
    .split(/[;,]/)
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

function isTruthyInvestorFlag(value) {
  if (typeof value === "boolean") {
    return value;
  }

  return ["yes", "true", "investor-visible", "aquabona", "visible"].includes(
    String(value ?? "")
      .trim()
      .toLowerCase(),
  );
}

function isInvestorVisibleProject(project) {
  const tags = getProjectTags(project);

  return (
    isTruthyInvestorFlag(project?.investorVisible) ||
    isTruthyInvestorFlag(project?.aquabona) ||
    isTruthyInvestorFlag(project?.aquabonaInvestorVisible) ||
    tags.some((tag) =>
      [
        "aquabona",
        "investor",
        "investor-visible",
        "aquabona-investor",
      ].includes(tag),
    )
  );
}

function normalizeProjectRecord(project) {
  return {
    name: String(project?.name ?? "Project").trim() || "Project",
    status: String(project?.status ?? "Active").trim() || "Active",
    budget: String(project?.budget ?? "0").trim(),
    scope: String(project?.scope ?? "").trim(),
    nextTask: String(project?.nextTask ?? project?.task ?? "").trim(),
    proof: String(project?.proof ?? "").trim(),
    permit: String(project?.permit ?? "").trim(),
    notes: String(project?.notes ?? "").trim(),
    tags: Array.isArray(project?.tags)
      ? project.tags.join(", ")
      : String(project?.tags ?? project?.tag ?? "").trim(),
    investorVisible: isInvestorVisibleProject(project)
      ? "Yes"
      : String(project?.investorVisible ?? "No").trim(),
    aquabona: isTruthyInvestorFlag(project?.aquabona),
  };
}

function normalizeInvestorVisibility(value) {
  const source =
    value && typeof value === "object" && !Array.isArray(value) ? value : {};

  return Object.fromEntries(
    INVESTOR_VISIBILITY_CATEGORIES.map((category, index) => {
      const key = slugifyLabel(category);
      return [key, typeof source[key] === "boolean" ? source[key] : index < 5];
    }),
  );
}

function loadInvestorVisibility() {
  const storedVisibility = readLocalStorage(INVESTOR_VISIBILITY_KEY);

  if (!storedVisibility) {
    return normalizeInvestorVisibility();
  }

  try {
    return normalizeInvestorVisibility(JSON.parse(storedVisibility));
  } catch (error) {
    return normalizeInvestorVisibility();
  }
}

function saveInvestorVisibility() {
  writeLocalStorage(
    INVESTOR_VISIBILITY_KEY,
    JSON.stringify(investorVisibility),
  );
}

function normalizeMaintenanceRequest(request) {
  return {
    title: getMaintenanceTitle(request),
    propertyProject: String(
      request?.propertyProject ?? request?.project ?? "",
    ).trim(),
    priority: getMaintenancePriority(request),
    tradeType: getMaintenanceTrade(request),
    assignedTechnician: String(
      request?.assignedTechnician ?? request?.technician ?? "",
    ).trim(),
    status: getMaintenanceStatus(request),
    estimatedCost: String(
      request?.estimatedCost ?? request?.cost ?? "0",
    ).trim(),
  };
}

function normalizeScheduleTask(task) {
  return {
    title: getScheduleTaskTitle(task),
    propertyProject: getScheduleTaskProject(task),
    assignedPerson: getScheduleTaskAssignee(task),
    dueDate: String(task?.dueDate ?? task?.due ?? "").trim(),
    priority: getScheduleTaskPriority(task),
    status: getScheduleTaskStatus(task),
  };
}

function normalizeInventoryToolItem(item) {
  return {
    name:
      String(
        item?.name ?? item?.toolName ?? item?.itemName ?? "Inventory item",
      ).trim() || "Inventory item",
    tag: String(item?.tag ?? item?.qrCode ?? item?.code ?? "").trim(),
    holder: String(item?.holder ?? item?.worker ?? item?.truck ?? "").trim(),
    project: String(item?.project ?? item?.job ?? "").trim(),
    status: getInventoryToolStatus(item),
  };
}

function normalizeFieldWalkthroughRecord(record) {
  return {
    projectProperty: getWalkthroughProject(record),
    customerNotes: String(
      record?.customerNotes ?? record?.customerNote ?? "",
    ).trim(),
    voiceNoteSummary: String(
      record?.voiceNoteSummary ?? record?.voiceSummary ?? "",
    ).trim(),
    measurementNotes: String(
      record?.measurementNotes ?? record?.measurements ?? "",
    ).trim(),
    scopeDraft: String(record?.scopeDraft ?? record?.scope ?? "").trim(),
    photoProofPlaceholder: String(
      record?.photoProofPlaceholder ?? record?.proof ?? "",
    ).trim(),
    readinessStatus: getWalkthroughStatus(record),
  };
}

function normalizeCustomerPortalRecord(record) {
  return {
    customerName: getCustomerPortalTitle(record),
    projectProperty: getCustomerPortalProject(record),
    requestType: getCustomerPortalRequestType(record),
    messageNotes: String(
      record?.messageNotes ?? record?.notes ?? record?.message ?? "",
    ).trim(),
    approvalStatus: getCustomerPortalStatus(record),
  };
}

function normalizeEstimateProposalRecord(record) {
  return {
    projectProperty: getEstimateProject(record),
    customerInvestor: getEstimateCustomerInvestor(record),
    estimateTitle: getEstimateTitle(record),
    scopeSummary: String(
      record?.scopeSummary ?? record?.scope ?? record?.summary ?? "",
    ).trim(),
    tier: getEstimateTier(record),
    amount: String(record?.amount ?? record?.estimateAmount ?? "0").trim(),
    status: getEstimateStatus(record),
  };
}

function normalizeOwnerApprovalRecord(record) {
  return {
    title: getOwnerApprovalTitle(record),
    projectProperty: getOwnerApprovalProject(record),
    approvalType: getOwnerApprovalType(record),
    amount: String(record?.amount ?? record?.reviewAmount ?? "0").trim(),
    requestedBy: String(record?.requestedBy ?? record?.requester ?? "").trim(),
    status: getOwnerApprovalStatus(record),
    notes: String(record?.notes ?? record?.note ?? "").trim(),
  };
}

function normalizeDocumentRecord(record) {
  return {
    title: getDocumentTitle(record),
    projectProperty: getDocumentProject(record),
    documentType: getDocumentType(record),
    status: getDocumentStatus(record),
    notes: String(record?.notes ?? record?.note ?? "").trim(),
  };
}

function normalizeBugRecord(record) {
  return {
    title: getBugTitle(record),
    moduleArea: getBugModuleArea(record),
    severity: getBugSeverity(record),
    status: getBugStatus(record),
    stepsToReproduce: String(
      record?.stepsToReproduce ?? record?.steps ?? record?.reproSteps ?? "",
    ).trim(),
    notes: String(record?.notes ?? record?.note ?? "").trim(),
  };
}

function normalizeDemoData(value) {
  const source =
    value?.demoData && typeof value.demoData === "object"
      ? value.demoData
      : value;
  const defaults = cloneDemoDefaults();

  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return null;
  }

  return Object.fromEntries(
    Object.keys(defaults).map((key) => {
      const items = Array.isArray(source[key]) ? source[key] : defaults[key];

      if (key === "projects") {
        return [key, items.map(normalizeProjectRecord)];
      }

      if (key === "maintenancePlusHvac") {
        return [key, items.map(normalizeMaintenanceRequest)];
      }

      if (key === "scheduleTasks") {
        return [key, items.map(normalizeScheduleTask)];
      }

      if (key === "inventoryTools") {
        return [key, items.map(normalizeInventoryToolItem)];
      }

      if (key === "fieldWalkthrough") {
        return [key, items.map(normalizeFieldWalkthroughRecord)];
      }

      if (key === "customerPortal") {
        return [key, items.map(normalizeCustomerPortalRecord)];
      }

      if (key === "estimatesProposals") {
        return [key, items.map(normalizeEstimateProposalRecord)];
      }

      if (key === "ownerApprovals") {
        return [key, items.map(normalizeOwnerApprovalRecord)];
      }

      if (key === "jobDocuments") {
        return [key, items.map(normalizeDocumentRecord)];
      }

      if (key === "bugCapture") {
        return [key, items.map(normalizeBugRecord)];
      }

      return [key, items];
    }),
  );
}

function normalizeRecentActivity(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((entry) => entry && typeof entry === "object")
    .map((entry) => ({
      id: String(entry.id ?? `${Date.now()}-${Math.random()}`),
      module: String(entry.module ?? "Demo Data"),
      title: String(entry.title ?? "Saved demo entry"),
      meta: String(entry.meta ?? ""),
      createdAt: String(entry.createdAt ?? new Date().toISOString()),
    }))
    .slice(0, MAX_RECENT_ACTIVITY);
}

function loadRecentActivity() {
  const storedActivity = readLocalStorage(RECENT_ACTIVITY_KEY);

  if (!storedActivity) {
    return [];
  }

  try {
    return normalizeRecentActivity(JSON.parse(storedActivity));
  } catch (error) {
    return [];
  }
}

function saveRecentActivity() {
  writeLocalStorage(
    RECENT_ACTIVITY_KEY,
    JSON.stringify(recentActivity.slice(0, MAX_RECENT_ACTIVITY)),
  );
}

function formatActivityTime(createdAt) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getReceiptStatus(receipt) {
  const status = String(receipt?.status ?? "").trim();

  return RECEIPT_REVIEW_STATUSES.includes(status)
    ? status
    : RECEIPT_REVIEW_STATUSES[0];
}

function getPayrollStatus(record) {
  const status = String(record?.status ?? "").trim();

  return PAYROLL_PREP_STATUSES.includes(status)
    ? status
    : PAYROLL_PREP_STATUSES[0];
}

function getInventoryToolStatus(item) {
  const status = String(item?.status ?? "").trim();

  return INVENTORY_TOOL_STATUSES.includes(status)
    ? status
    : INVENTORY_TOOL_STATUSES[0];
}

function getWalkthroughProject(record) {
  return (
    String(
      record?.projectProperty ??
        record?.propertyProject ??
        record?.project ??
        "Jobsite capture",
    ).trim() || "Jobsite capture"
  );
}

function getWalkthroughStatus(record) {
  const status = String(record?.readinessStatus ?? record?.status ?? "").trim();

  return WALKTHROUGH_READINESS_STATUSES.includes(status)
    ? status
    : WALKTHROUGH_READINESS_STATUSES[0];
}

function getCustomerPortalTitle(record) {
  return (
    String(
      record?.customerName ?? record?.customer ?? record?.ownerName ?? "Customer",
    ).trim() || "Customer"
  );
}

function getCustomerPortalProject(record) {
  return (
    String(
      record?.projectProperty ?? record?.propertyProject ?? record?.project ?? "Saved project",
    ).trim() || "Saved project"
  );
}

function getCustomerPortalRequestType(record) {
  const requestType = String(record?.requestType ?? record?.type ?? "").trim();

  return CUSTOMER_PORTAL_REQUEST_TYPES.includes(requestType)
    ? requestType
    : CUSTOMER_PORTAL_REQUEST_TYPES[0];
}

function getCustomerPortalStatus(record) {
  const status = String(
    record?.approvalStatus ?? record?.status ?? record?.reviewStatus ?? "",
  ).trim();

  return CUSTOMER_PORTAL_APPROVAL_STATUSES.includes(status)
    ? status
    : CUSTOMER_PORTAL_APPROVAL_STATUSES[0];
}

function getEstimateTitle(record) {
  return (
    String(
      record?.estimateTitle ?? record?.title ?? record?.proposalTitle ?? "Estimate",
    ).trim() || "Estimate"
  );
}

function getEstimateProject(record) {
  return (
    String(
      record?.projectProperty ?? record?.propertyProject ?? record?.project ?? "Saved project",
    ).trim() || "Saved project"
  );
}

function getEstimateCustomerInvestor(record) {
  return (
    String(
      record?.customerInvestor ?? record?.customer ?? record?.investor ?? "Customer / investor",
    ).trim() || "Customer / investor"
  );
}

function getEstimateTier(record) {
  const tier = String(record?.tier ?? "").trim();

  return ESTIMATE_TIERS.includes(tier) ? tier : ESTIMATE_TIERS[0];
}

function getEstimateStatus(record) {
  const status = String(record?.status ?? record?.proposalStatus ?? "").trim();

  return ESTIMATE_STATUSES.includes(status) ? status : ESTIMATE_STATUSES[0];
}

function getDocumentTitle(record) {
  return (
    String(record?.title ?? record?.documentTitle ?? "Job document").trim() ||
    "Job document"
  );
}

function getDocumentProject(record) {
  return (
    String(
      record?.projectProperty ??
        record?.propertyProject ??
        record?.project ??
        "Saved project",
    ).trim() || "Saved project"
  );
}

function getDocumentType(record) {
  const documentType = String(
    record?.documentType ?? record?.type ?? "",
  ).trim();

  return DOCUMENT_TYPES.includes(documentType) ? documentType : DOCUMENT_TYPES[0];
}

function getDocumentStatus(record) {
  const status = String(record?.status ?? record?.reviewStatus ?? "").trim();

  return DOCUMENT_STATUSES.includes(status) ? status : DOCUMENT_STATUSES[0];
}

function getBugTitle(record) {
  return (
    String(record?.title ?? record?.bugTitle ?? "QA issue").trim() ||
    "QA issue"
  );
}

function getBugModuleArea(record) {
  return (
    String(
      record?.moduleArea ?? record?.module ?? record?.area ?? "General",
    ).trim() ||
    "General"
  );
}

function getBugSeverity(record) {
  const severity = String(record?.severity ?? "").trim();

  return BUG_SEVERITIES.includes(severity) ? severity : BUG_SEVERITIES[0];
}

function getBugStatus(record) {
  const status = String(record?.status ?? "").trim();

  return BUG_STATUSES.includes(status) ? status : BUG_STATUSES[0];
}

function getAccountingReviewStatus(value) {
  const status = String(value?.status ?? value ?? "").trim();

  return ACCOUNTING_REVIEW_STATUSES.includes(status)
    ? status
    : ACCOUNTING_REVIEW_STATUSES[0];
}

function getOwnerApprovalTitle(record) {
  return (
    String(record?.title ?? record?.approvalTitle ?? "Approval item").trim() ||
    "Approval item"
  );
}

function getOwnerApprovalProject(record) {
  return (
    String(
      record?.projectProperty ??
        record?.propertyProject ??
        record?.project ??
        "Saved project",
    ).trim() || "Saved project"
  );
}

function getOwnerApprovalType(record) {
  const approvalType = String(record?.approvalType ?? record?.type ?? "").trim();

  return OWNER_APPROVAL_TYPES.includes(approvalType)
    ? approvalType
    : OWNER_APPROVAL_TYPES[0];
}

function getOwnerApprovalStatus(record) {
  const status = String(record?.status ?? record?.approvalStatus ?? "").trim();

  return OWNER_APPROVAL_STATUSES.includes(status)
    ? status
    : OWNER_APPROVAL_STATUSES[0];
}

function getLaborCost(record) {
  return (Number(record?.hours) || 0) * (Number(record?.rate) || 0);
}

function getMaintenanceTitle(request) {
  return (
    String(
      request?.title ?? request?.request ?? "Maintenance request",
    ).trim() || "Maintenance request"
  );
}

function getMaintenancePriority(request) {
  const priority = String(request?.priority ?? "").trim();

  if (priority === "Medium") {
    return "Normal";
  }

  return MAINTENANCE_PRIORITIES.includes(priority) ? priority : "Normal";
}

function getMaintenanceTrade(request) {
  const trade = String(request?.tradeType ?? request?.trade ?? "").trim();

  return MAINTENANCE_TRADES.includes(trade) ? trade : "Maintenance";
}

function getMaintenanceStatus(request) {
  const status = String(request?.status ?? "").trim();

  if (["Queued", "Open", "Pending"].includes(status)) {
    return "New Request";
  }

  return MAINTENANCE_DISPATCH_STATUSES.includes(status)
    ? status
    : "New Request";
}

function getScheduleTaskTitle(task) {
  return (
    String(task?.title ?? task?.taskTitle ?? "Schedule task").trim() ||
    "Schedule task"
  );
}

function getScheduleTaskProject(task) {
  return (
    String(
      task?.propertyProject ??
        task?.projectProperty ??
        task?.project ??
        "Saved project",
    ).trim() || "Saved project"
  );
}

function getScheduleTaskAssignee(task) {
  return (
    String(task?.assignedPerson ?? task?.assignee ?? "Unassigned").trim() ||
    "Unassigned"
  );
}

function getScheduleTaskPriority(task) {
  const priority = String(task?.priority ?? "").trim();

  return SCHEDULE_TASK_PRIORITIES.includes(priority) ? priority : "Normal";
}

function getScheduleTaskStatus(task) {
  const status = String(task?.status ?? "").trim();

  return SCHEDULE_TASK_STATUSES.includes(status) ? status : "Not Started";
}

function formatScheduleDueDate(value) {
  if (!value) {
    return "No due date";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getScheduleSummary(tasks = demoData.scheduleTasks ?? []) {
  return {
    total: tasks.length,
    urgent: tasks.filter((task) => getScheduleTaskPriority(task) === "Urgent")
      .length,
    inProgress: tasks.filter(
      (task) => getScheduleTaskStatus(task) === "In Progress",
    ).length,
    waiting: tasks.filter((task) =>
      ["Waiting on Material", "Waiting on Inspection"].includes(
        getScheduleTaskStatus(task),
      ),
    ).length,
    completed: tasks.filter((task) => getScheduleTaskStatus(task) === "Complete")
      .length,
  };
}

function getMaintenanceSummary(requests = demoData.maintenancePlusHvac ?? []) {
  return {
    total: requests.length,
    urgent: requests.filter(
      (request) => getMaintenancePriority(request) === "Urgent",
    ).length,
    active: requests.filter((request) =>
      ACTIVE_MAINTENANCE_STATUSES.includes(getMaintenanceStatus(request)),
    ).length,
    complete: requests.filter(
      (request) => getMaintenanceStatus(request) === "Complete",
    ).length,
    totalEstimatedCost: requests.reduce(
      (total, request) => total + (Number(request.estimatedCost) || 0),
      0,
    ),
  };
}

function getPayrollPrepSummary(records = demoData.payrollPrep ?? []) {
  return {
    totalLaborCost: records.reduce(
      (total, record) => total + getLaborCost(record),
      0,
    ),
    draft: records.filter((record) => getPayrollStatus(record) === "Draft")
      .length,
    officeReview: records.filter(
      (record) => getPayrollStatus(record) === "Office Review",
    ).length,
    approvedHold: records.filter(
      (record) => getPayrollStatus(record) === "Approved Hold",
    ).length,
  };
}

function getReceiptAccountingSummary(receipts = demoData.receipts ?? []) {
  return {
    totalAmount: receipts.reduce(
      (total, receipt) => total + (Number(receipt.amount) || 0),
      0,
    ),
    needsReview: receipts.filter(
      (receipt) => getReceiptStatus(receipt) === "Needs Review",
    ).length,
    coded: receipts.filter((receipt) => getReceiptStatus(receipt) === "Coded")
      .length,
    accountingHold: receipts.filter(
      (receipt) => getReceiptStatus(receipt) === "Accounting Hold",
    ).length,
  };
}

function getInventoryToolSummary(items = demoData.inventoryTools ?? []) {
  return {
    total: items.length,
    available: items.filter(
      (item) => getInventoryToolStatus(item) === "Available",
    ).length,
    checkedOut: items.filter(
      (item) => getInventoryToolStatus(item) === "Checked Out",
    ).length,
    assignedToJob: items.filter(
      (item) => getInventoryToolStatus(item) === "Assigned to Job",
    ).length,
    lostDamaged: items.filter(
      (item) => getInventoryToolStatus(item) === "Lost / Damaged",
    ).length,
  };
}

function getWalkthroughSummary(records = demoData.fieldWalkthrough ?? []) {
  return {
    total: records.length,
    draftCapture: records.filter(
      (record) => getWalkthroughStatus(record) === "Draft Capture",
    ).length,
    officeReview: records.filter(
      (record) => getWalkthroughStatus(record) === "Needs Office Review",
    ).length,
    readyForEstimate: records.filter(
      (record) => getWalkthroughStatus(record) === "Ready for Estimate",
    ).length,
    sentToProposal: records.filter(
      (record) => getWalkthroughStatus(record) === "Sent to Proposal",
    ).length,
  };
}

function getCustomerPortalSummary(records = demoData.customerPortal ?? []) {
  return {
    total: records.length,
    officeReview: records.filter(
      (record) => getCustomerPortalStatus(record) === "Office Review",
    ).length,
    waitingOnOwner: records.filter(
      (record) => getCustomerPortalStatus(record) === "Waiting on Owner",
    ).length,
    approved: records.filter(
      (record) => getCustomerPortalStatus(record) === "Approved",
    ).length,
    closed: records.filter(
      (record) => getCustomerPortalStatus(record) === "Closed",
    ).length,
  };
}

function getEstimateSummary(records = demoData.estimatesProposals ?? []) {
  return {
    totalAmount: records.reduce(
      (total, record) => total + (Number(record.amount) || 0),
      0,
    ),
    approvedAmount: records.reduce(
      (total, record) =>
        getEstimateStatus(record) === "Approved"
          ? total + (Number(record.amount) || 0)
          : total,
      0,
    ),
    draft: records.filter((record) => getEstimateStatus(record) === "Draft")
      .length,
    officeReview: records.filter(
      (record) => getEstimateStatus(record) === "Office Review",
    ).length,
    sent: records.filter(
      (record) => getEstimateStatus(record) === "Sent to Customer",
    ).length,
    approved: records.filter(
      (record) => getEstimateStatus(record) === "Approved",
    ).length,
    changeOrder: records.filter(
      (record) => getEstimateStatus(record) === "Change Order",
    ).length,
  };
}

function getDocumentSummary(records = demoData.jobDocuments ?? []) {
  return {
    total: records.length,
    permits: records.filter((record) => getDocumentType(record) === "Permit").length,
    inspections: records.filter((record) => getDocumentType(record) === "Inspection").length,
    insurance: records.filter((record) => getDocumentType(record) === "Insurance").length,
    photoProof: records.filter((record) => getDocumentType(record) === "Photo Proof").length,
    needsReview: records.filter(
      (record) => getDocumentStatus(record) === "Needs Review",
    ).length,
    missing: records.filter((record) => getDocumentStatus(record) === "Missing")
      .length,
  };
}

function getBugSummary(records = demoData.bugCapture ?? []) {
  return {
    total: records.length,
    newBugs: records.filter((record) => getBugStatus(record) === "New").length,
    highCritical: records.filter((record) =>
      ["High", "Critical"].includes(getBugSeverity(record)),
    ).length,
    fixed: records.filter((record) => getBugStatus(record) === "Fixed").length,
    retestNeeded: records.filter(
      (record) => getBugStatus(record) === "Retest Needed",
    ).length,
  };
}

function getOwnerApprovalSummary(records = demoData.ownerApprovals ?? []) {
  return {
    total: records.length,
    pending: records.filter(
      (record) => getOwnerApprovalStatus(record) === "Pending",
    ).length,
    officeReview: records.filter(
      (record) => getOwnerApprovalStatus(record) === "Office Review",
    ).length,
    approved: records.filter(
      (record) => getOwnerApprovalStatus(record) === "Owner Approved",
    ).length,
    accountingHold: records.filter(
      (record) => getOwnerApprovalStatus(record) === "Accounting Hold",
    ).length,
    totalAmountUnderReview: records.reduce((total, record) => {
      const status = getOwnerApprovalStatus(record);

      return ["Pending", "Office Review", "Accounting Hold"].includes(status)
        ? total + (Number(record.amount) || 0)
        : total;
    }, 0),
  };
}

function getDailyAccountingSummary() {
  const estimateSummary = getEstimateSummary(demoData.estimatesProposals ?? []);
  const receiptSummary = getReceiptAccountingSummary(demoData.receipts ?? []);
  const payrollSummary = getPayrollPrepSummary(demoData.payrollPrep ?? []);
  const maintenanceSummary = getMaintenanceSummary(
    demoData.maintenancePlusHvac ?? [],
  );
  const demoGrossPreview =
    estimateSummary.approvedAmount -
    receiptSummary.totalAmount -
    payrollSummary.totalLaborCost -
    maintenanceSummary.totalEstimatedCost;

  return {
    approvedEstimateAmount: estimateSummary.approvedAmount,
    totalReceiptCost: receiptSummary.totalAmount,
    totalPayrollPrepCost: payrollSummary.totalLaborCost,
    totalMaintenanceEstimatedRepairCost: maintenanceSummary.totalEstimatedCost,
    demoGrossPreview,
  };
}

function normalizeAccountingReview(value) {
  const source =
    value && typeof value === "object" && !Array.isArray(value) ? value : {};

  return {
    status: getAccountingReviewStatus(source.status),
    notes: String(source.notes ?? "").trim(),
    updatedAt: String(source.updatedAt ?? "").trim(),
  };
}

function loadAccountingReview() {
  const storedReview = readLocalStorage(ACCOUNTING_REVIEW_KEY);

  if (!storedReview) {
    return normalizeAccountingReview();
  }

  try {
    return normalizeAccountingReview(JSON.parse(storedReview));
  } catch (error) {
    return normalizeAccountingReview();
  }
}

function saveAccountingReview() {
  accountingReview.updatedAt = new Date().toISOString();
  writeLocalStorage(ACCOUNTING_REVIEW_KEY, JSON.stringify(accountingReview));
}

function renderRecentActivity() {
  clearActivity.disabled = recentActivity.length === 0;

  if (!recentActivity.length) {
    activityList.innerHTML =
      '<li class="activity-empty">No recent demo activity yet.</li>';
    return;
  }

  activityList.innerHTML = recentActivity
    .map(
      (entry) => `
        <li>
          <div>
            <strong>${escapeHtml(entry.module)} · ${escapeHtml(entry.title)}</strong>
            <span>${escapeHtml(entry.meta)}</span>
          </div>
          <span class="activity-time">${escapeHtml(formatActivityTime(entry.createdAt))}</span>
        </li>
      `,
    )
    .join("");
}

function addRecentActivity(moduleId, item) {
  const demoModule = demoModules[moduleId];

  if (!demoModule) {
    return;
  }

  const module = modules.find(
    (candidate) => getModuleId(candidate.name) === moduleId,
  );
  const formattedItem = demoModule.format(item);

  recentActivity = [
    {
      id: `${Date.now()}-${moduleId}`,
      module: module?.name ?? demoModule.eyebrow,
      title: formattedItem.title,
      meta: `Saved ${demoModule.submitLabel.replace(/^Save\s+/i, "").toLowerCase()} · ${formattedItem.meta}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addPayrollStatusActivity(record, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-payroll-status`,
      module: "Payroll Prep",
      title: record.workerName || "Labor status",
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${record.project || "Unassigned project"} · ${formatCurrency(getLaborCost(record))} labor hold`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addMaintenanceStatusActivity(request, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-maintenance-status`,
      module: "Maintenance + HVAC",
      title: getMaintenanceTitle(request),
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${request.propertyProject || "Unassigned property/project"} · ${getMaintenanceTrade(request)} · ${formatCurrency(request.estimatedCost)}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addScheduleStatusActivity(task, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-schedule-status`,
      module: "Schedule / Tasks",
      title: getScheduleTaskTitle(task),
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${getScheduleTaskProject(task)} · Due ${formatScheduleDueDate(task.dueDate)}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addReceiptStatusActivity(receipt, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-receipt-status`,
      module: "Receipts",
      title: receipt.vendor || "Receipt status",
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${receipt.project || "Unassigned project"} · ${formatCurrency(receipt.amount)}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addInventoryToolStatusActivity(item, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-inventory-status`,
      module: "Inventory / Tools",
      title: item.name || "Inventory item",
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${item.tag || "No tag"} · ${item.holder || "No holder"} · ${item.project || "Unassigned project"}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addInvestorVisibilityActivity(category, nextValue) {
  recentActivity = [
    {
      id: `${Date.now()}-investor-visibility`,
      module: "Aquabona Investor Portal",
      title: category,
      meta: `Owner demo visibility ${nextValue ? "enabled" : "hidden"} · read-only investor view`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addWalkthroughStatusActivity(record, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-walkthrough-status`,
      module: "Field Walkthrough",
      title: getWalkthroughProject(record),
      meta: `Estimate readiness changed from ${previousStatus} to ${nextStatus} · ${record.scopeDraft || "Scope draft pending"}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addCustomerPortalStatusActivity(record, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-customer-portal-status`,
      module: "Customer / Homeowner Portal",
      title: getCustomerPortalTitle(record),
      meta: `Approval status changed from ${previousStatus} to ${nextStatus} · ${getCustomerPortalProject(record)} · ${getCustomerPortalRequestType(record)}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addEstimateStatusActivity(record, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-estimate-status`,
      module: "Estimates / Proposals / Change Orders",
      title: getEstimateTitle(record),
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${getEstimateProject(record)} · ${getEstimateCustomerInvestor(record)} · ${formatCurrency(record.amount)}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addDocumentStatusActivity(record, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-document-status`,
      module: "Job Documents / Evidence Binder",
      title: getDocumentTitle(record),
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${getDocumentProject(record)} · ${getDocumentType(record)}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addBugStatusActivity(record, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-bug-status`,
      module: "Bug Capture / QA Issue Log",
      title: getBugTitle(record),
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${getBugModuleArea(record)} · ${getBugSeverity(record)} severity`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addAccountingReviewStatusActivity(previousStatus, nextStatus) {
  const summary = getDailyAccountingSummary();

  recentActivity = [
    {
      id: `${Date.now()}-accounting-review-status`,
      module: "Accounting Review",
      title: "Daily P&L / Accounting Review",
      meta: `Status changed from ${previousStatus} to ${nextStatus} · demo gross preview ${formatCurrency(summary.demoGrossPreview)}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addOwnerApprovalStatusActivity(record, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-owner-approval-status`,
      module: "Owner Approvals / Review Queue",
      title: getOwnerApprovalTitle(record),
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${getOwnerApprovalProject(record)} · ${getOwnerApprovalType(record)} · ${formatCurrency(record.amount)}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function clearRecentActivity() {
  recentActivity = [];
  saveRecentActivity();
  renderRecentActivity();
}

function setBackupStatus(message) {
  backupStatus.textContent = message;
}

function refreshDemoViews() {
  renderModules();

  if (activeModule) {
    renderDemoModule(getModuleId(activeModule.name));
  }
}

function exportDemoDataAsJson() {
  backupJson.value = JSON.stringify(demoData, null, 2);
  backupJson.focus();
  backupJson.select();
  setBackupStatus("Demo data exported as JSON.");
}

function importDemoDataFromJson() {
  try {
    const importedData = normalizeDemoData(JSON.parse(backupJson.value));

    if (!importedData) {
      setBackupStatus("Import needs a JSON object from the demo data export.");
      return;
    }

    demoData = importedData;
    saveDemoData();
    refreshDemoViews();
    setBackupStatus("Demo data imported from pasted JSON.");
  } catch (error) {
    setBackupStatus(
      "Import failed. Check that the pasted demo data is valid JSON.",
    );
  }
}

function loadDemoData() {
  const storedData = readLocalStorage(DEMO_DATA_KEY);

  if (!storedData) {
    return cloneDemoDefaults();
  }

  try {
    return normalizeDemoData(JSON.parse(storedData)) ?? cloneDemoDefaults();
  } catch (error) {
    return cloneDemoDefaults();
  }
}

function saveDemoData() {
  writeLocalStorage(DEMO_DATA_KEY, JSON.stringify(demoData));
}

const saveLastOpenedModule = (moduleId) => {
  writeLocalStorage(LAST_OPENED_MODULE_KEY, moduleId);
};

const getLastOpenedModule = () => readLocalStorage(LAST_OPENED_MODULE_KEY);

const saveSelectedProject = (projectName) => {
  selectedProjectName = projectName;
  writeLocalStorage(SELECTED_PROJECT_KEY, projectName);
};

const setActiveModuleCard = (moduleId) => {
  cardGrid.querySelectorAll(".brain-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.moduleId === moduleId);
  });
};

function getDemoCount(moduleId) {
  const demoModule = demoModules[moduleId];

  if (moduleId === "aquabona-investor-portal") {
    return getInvestorProjects().length;
  }

  if (!demoModule) {
    return 0;
  }

  return demoData[demoModule.storageKey]?.length ?? 0;
}

function getSummaryCount(summaryItem) {
  const items = demoData[summaryItem.storageKey] ?? [];

  return summaryItem.getCount ? summaryItem.getCount(items) : items.length;
}

function getInsightMessage(summaryItem) {
  const count = getSummaryCount(summaryItem);

  switch (summaryItem.storageKey) {
    case "projects":
      return `${count} active ${count === 1 ? "project is" : "projects are"} in the local demo project log.`;
    case "receipts":
      return `${count} ${count === 1 ? "receipt needs" : "receipts need"} review before office handoff.`;
    case "maintenancePlusHvac":
      return `${count} maintenance/HVAC ${count === 1 ? "request is" : "requests are"} saved for follow-up.`;
    case "scheduleTasks": {
      const summary = getScheduleSummary(demoData.scheduleTasks ?? []);
      return `${summary.total} schedule ${summary.total === 1 ? "task is" : "tasks are"} saved: ${summary.urgent} urgent, ${summary.inProgress} in progress, ${summary.waiting} waiting, and ${summary.completed} complete.`;
    }
    case "inventoryTools":
      return `${count} inventory/tool ${count === 1 ? "record is" : "records are"} being tracked.`;
    case "fieldWalkthrough":
      return `${count} field walkthrough ${count === 1 ? "capture is" : "captures are"} saved for estimate readiness review.`;
    case "customerPortal":
      return `${count} customer portal ${count === 1 ? "request is" : "requests are"} saved for office follow-up.`;
    case "estimatesProposals":
      return `${count} estimate/proposal ${count === 1 ? "record is" : "records are"} saved for office review and change-order tracking.`;
    case "ownerApprovals": {
      const summary = getOwnerApprovalSummary(demoData.ownerApprovals ?? []);
      return `${summary.total} owner approval ${summary.total === 1 ? "item is" : "items are"} saved: ${summary.pending} pending, ${summary.officeReview} in office review, ${summary.approved} approved, and ${summary.accountingHold} accounting hold.`;
    }
    case "jobDocuments": {
      const summary = getDocumentSummary(demoData.jobDocuments ?? []);
      return `${summary.total} document ${summary.total === 1 ? "record is" : "records are"} saved: ${summary.permits} permits, ${summary.inspections} inspections, ${summary.insurance} insurance, ${summary.photoProof} photo proof, ${summary.needsReview} needs review, and ${summary.missing} missing.`;
    }
    case "bugCapture": {
      const summary = getBugSummary(demoData.bugCapture ?? []);
      return `${summary.total} QA ${summary.total === 1 ? "issue is" : "issues are"} captured: ${summary.newBugs} new, ${summary.highCritical} high/critical, ${summary.fixed} fixed, and ${summary.retestNeeded} needing retest.`;
    }
    default:
      return `${count} ${summaryItem.label.toLowerCase()} saved in demo storage.`;
  }
}

function renderAiInsights() {
  const fragment = document.createDocumentFragment();

  dashboardSummaryItems.forEach((summaryItem) => {
    const insight = document.createElement("li");
    insight.textContent = getInsightMessage(summaryItem);
    fragment.appendChild(insight);
  });

  aiInsightsList.replaceChildren(fragment);
  aiInsightsUpdated.textContent = `Insights refreshed from local demo data at ${formatActivityTime(new Date().toISOString())}.`;
}

function refreshAiInsights() {
  demoData = loadDemoData();
  renderDashboardSummary();
  renderAiInsights();
}

function renderDashboardSummary() {
  const fragment = document.createDocumentFragment();

  dashboardSummaryItems.forEach((summaryItem) => {
    const card = document.createElement("article");
    card.className = "summary-card";
    card.innerHTML = `
      <span class="summary-count">${getSummaryCount(summaryItem)}</span>
      <span class="summary-label">${summaryItem.label}</span>
      <span class="summary-helper">${summaryItem.helper}</span>
    `;
    fragment.appendChild(card);
  });

  dashboardSummary.replaceChildren(fragment);
}

function getInvestorProjects() {
  return (demoData.projects ?? []).filter(isInvestorVisibleProject);
}

function getInvestorCategorySummary(category, project) {
  const receipts = getProjectReceipts(project.name);
  const inventoryProof = (demoData.inventoryTools ?? []).filter(
    (item) => item.project === project.name,
  );

  switch (category) {
    case "Scope of Work":
      return project.scope || "Placeholder scope summary for investor review.";
    case "Project status":
      return `${project.status || "Demo"} · Next: ${project.nextTask || "Owner-controlled update pending."}`;
    case "Photos / Proof":
      return (
        project.proof ||
        "Placeholder for before, progress, and completion proof."
      );
    case "Receipts":
      return receipts.length
        ? `${receipts.length} demo receipt${receipts.length === 1 ? "" : "s"} linked.`
        : "Receipts hidden or pending.";
    case "Permits / Inspections":
      return (
        project.permit ||
        "Permit and inspection placeholders pending owner approval."
      );
    case "Insurance documents":
      return "Placeholder insurance document visibility.";
    case "Inventory proof":
      return inventoryProof.length
        ? `${inventoryProof.length} inventory/tool proof item${inventoryProof.length === 1 ? "" : "s"} linked.`
        : "Inventory proof placeholder.";
    case "Change orders":
      return "Placeholder change-order visibility.";
    case "Closeout":
      return project.notes || "Closeout placeholder and owner notes pending.";
    default:
      return "Placeholder investor visibility category.";
  }
}

function renderAquabonaInvestorPortal() {
  const investorProjects = getInvestorProjects();
  const enabledCategories = INVESTOR_VISIBILITY_CATEGORIES.filter(
    (category) => investorVisibility[slugifyLabel(category)],
  );
  const toggleRows = INVESTOR_VISIBILITY_CATEGORIES.map((category) => {
    const key = slugifyLabel(category);
    const isChecked = investorVisibility[key];

    return `
        <label class="investor-toggle">
          <input type="checkbox" data-investor-category="${escapeHtml(key)}" data-investor-category-label="${escapeHtml(category)}" ${isChecked ? "checked" : ""} />
          <span>${escapeHtml(category)}</span>
        </label>
      `;
  }).join("");

  const projectCards = investorProjects.length
    ? investorProjects
        .map((project) => {
          const categoryItems = enabledCategories
            .map(
              (category) => `
                <li>
                  <strong>${escapeHtml(category)}</strong>
                  <span>${escapeHtml(getInvestorCategorySummary(category, project))}</span>
                </li>
              `,
            )
            .join("");

          return `
            <article class="investor-project-card">
              <div class="investor-project-header">
                <div>
                  <p class="eyebrow">Investor Project</p>
                  <h5>${escapeHtml(project.name)}</h5>
                </div>
                <span>${escapeHtml(project.status || "Demo")}</span>
              </div>
              <p>${escapeHtml(formatCurrency(project.budget))} demo budget · ${escapeHtml(getProjectTags(project).join(", ") || "Aquabona investor-visible")}</p>
              <ul>${categoryItems || "<li><strong>Owner controlled</strong><span>No investor categories enabled yet.</span></li>"}</ul>
            </article>
          `;
        })
        .join("")
    : `
      <article class="investor-project-empty">
        <p class="eyebrow">Investor Projects</p>
        <h5>No Aquabona investor-visible projects yet</h5>
        <p>Tag a saved project with Aquabona or investor-visible, or set Investor visible to Yes in Projects, to show it here.</p>
      </article>
    `;

  return `
    <section class="investor-portal-panel" aria-label="Aquabona Investor Portal panel">
      <div class="investor-portal-header">
        <div>
          <p class="eyebrow">Aquabona</p>
          <h4>Investor Portal</h4>
        </div>
        <span class="investor-readonly-status">Read-only demo</span>
      </div>
      <p class="investor-lock-note">Payroll is hidden by default. Investor view is read-only and owner-controlled.</p>
      <div class="investor-toggle-panel">
        <div>
          <p class="eyebrow">Owner Controls</p>
          <h5>Demo visibility toggles</h5>
        </div>
        <div class="investor-toggle-grid">${toggleRows}</div>
      </div>
      <div class="investor-project-grid">${projectCards}</div>
    </section>
  `;
}

function updateInvestorVisibility(categoryKey, categoryLabel, nextValue) {
  investorVisibility[categoryKey] = nextValue;
  saveInvestorVisibility();
  addInvestorVisibilityActivity(categoryLabel, nextValue);
  renderDemoModule("aquabona-investor-portal");
}

function getProjectReceipts(projectName) {
  return (demoData.receipts ?? []).filter(
    (receipt) => receipt.project === projectName,
  );
}

function getSelectedProject(items) {
  if (!items.length) {
    return null;
  }

  return items.find((item) => item.name === selectedProjectName) ?? null;
}

function getProjectFolderSections(project) {
  const projectReceipts = getProjectReceipts(project.name);
  const receiptTotal = projectReceipts.reduce(
    (total, receipt) => total + (Number(receipt.amount) || 0),
    0,
  );

  return [
    {
      title: "Scope of Work",
      body:
        project.scope || "Placeholder scope summary for this saved project.",
    },
    {
      title: "Schedule / Tasks",
      body:
        project.nextTask ||
        "Placeholder task list and schedule milestones for the field team.",
    },
    {
      title: "Photos / Proof",
      body:
        project.proof ||
        "Placeholder proof log for before, progress, and completion photos.",
    },
    {
      title: "Receipts",
      body: projectReceipts.length
        ? `${projectReceipts.length} demo receipt${projectReceipts.length === 1 ? "" : "s"} linked · ${formatCurrency(receiptTotal)} total.`
        : "No demo receipts linked to this project yet.",
    },
    {
      title: "Permits / Inspections",
      body:
        project.permit ||
        "Placeholder permit and inspection checkpoints for office follow-up.",
    },
    {
      title: "Notes",
      body:
        project.notes ||
        "Placeholder notes for owner updates, field context, and open questions.",
    },
  ];
}

function renderProjectFolder(project) {
  if (!project) {
    return `
      <section class="project-folder-empty" aria-label="Project detail placeholder">
        <p class="eyebrow">Job Folder</p>
        <h4>Select a saved project</h4>
        <p>Choose a project from the demo list to preview the lightweight job folder sections.</p>
      </section>
    `;
  }

  const sections = getProjectFolderSections(project)
    .map(
      (section) => `
        <article class="project-folder-card">
          <h5>${escapeHtml(section.title)}</h5>
          <p>${escapeHtml(section.body)}</p>
        </article>
      `,
    )
    .join("");

  return `
    <section class="project-folder" aria-label="Project job folder">
      <div class="project-folder-header">
        <div>
          <p class="eyebrow">Job Folder</p>
          <h4>${escapeHtml(project.name)}</h4>
        </div>
        <span class="project-folder-status">${escapeHtml(project.status || "Demo")}</span>
      </div>
      <p class="project-folder-meta">${escapeHtml(formatCurrency(project.budget))} demo budget · localStorage only</p>
      <div class="project-folder-grid">${sections}</div>
    </section>
  `;
}

function renderReceiptReviewPanel(receipts) {
  const summary = getReceiptAccountingSummary(receipts);

  if (!receipts.length) {
    return `
      <section class="receipt-review-panel" aria-label="Receipts review and accounting feed">
        <div class="receipt-review-header">
          <div>
            <p class="eyebrow">Accounting Feed</p>
            <h4>Receipts Review</h4>
          </div>
          <span class="receipt-feed-status">Local demo feed</span>
        </div>
        <div class="accounting-summary-grid" aria-label="Accounting summary">
          <article><strong>${escapeHtml(formatCurrency(summary.totalAmount))}</strong><span>Total receipt amount</span></article>
          <article><strong>${summary.needsReview}</strong><span>Needs review</span></article>
          <article><strong>${summary.coded}</strong><span>Coded</span></article>
          <article><strong>${summary.accountingHold}</strong><span>Accounting hold</span></article>
        </div>
        <p class="receipt-review-empty">No saved receipt demo records yet.</p>
      </section>
    `;
  }

  const receiptRows = receipts
    .map((receipt, index) => {
      const currentStatus = getReceiptStatus(receipt);
      const statusOptions = RECEIPT_REVIEW_STATUSES.map(
        (status) =>
          `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
      ).join("");

      return `
        <article class="receipt-review-card">
          <div>
            <strong>${escapeHtml(receipt.vendor || "Receipt")}</strong>
            <span>${escapeHtml(receipt.project || "Unassigned project")} · ${escapeHtml(formatCurrency(receipt.amount))}</span>
          </div>
          <label>
            <span>Status</span>
            <select data-receipt-status-index="${index}" aria-label="Receipt status for ${escapeHtml(receipt.vendor || "receipt")}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="receipt-review-panel" aria-label="Receipts review and accounting feed">
      <div class="receipt-review-header">
        <div>
          <p class="eyebrow">Accounting Feed</p>
          <h4>Receipts Review</h4>
        </div>
        <span class="receipt-feed-status">Local demo feed</span>
      </div>
      <div class="accounting-summary-grid" aria-label="Accounting summary">
        <article><strong>${escapeHtml(formatCurrency(summary.totalAmount))}</strong><span>Total receipt amount</span></article>
        <article><strong>${summary.needsReview}</strong><span>Needs review</span></article>
        <article><strong>${summary.coded}</strong><span>Coded</span></article>
        <article><strong>${summary.accountingHold}</strong><span>Accounting hold</span></article>
      </div>
      <div class="receipt-review-list">${receiptRows}</div>
    </section>
  `;
}

function updateReceiptStatus(index, nextStatus) {
  const receipt = demoData.receipts?.[index];

  if (!receipt || !RECEIPT_REVIEW_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getReceiptStatus(receipt);

  if (previousStatus === nextStatus) {
    return;
  }

  receipt.status = nextStatus;
  saveDemoData();
  addReceiptStatusActivity(receipt, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("receipts");
}

function renderMaintenanceDispatchPanel(requests) {
  const summary = getMaintenanceSummary(requests);
  const summaryGrid = `
    <div class="maintenance-summary-grid" aria-label="Maintenance and HVAC summary">
      <article><strong>${summary.total}</strong><span>Total requests</span></article>
      <article><strong>${summary.urgent}</strong><span>Urgent requests</span></article>
      <article><strong>${summary.active}</strong><span>Dispatched / active</span></article>
      <article><strong>${summary.complete}</strong><span>Completed requests</span></article>
      <article><strong>${escapeHtml(formatCurrency(summary.totalEstimatedCost))}</strong><span>Total estimated repair cost</span></article>
    </div>
  `;

  if (!requests.length) {
    return `
      <section class="maintenance-dispatch-panel" aria-label="Maintenance and HVAC dispatch panel">
        <div class="maintenance-dispatch-header">
          <div>
            <p class="eyebrow">Dispatch Panel</p>
            <h4>Maintenance + HVAC Summary</h4>
          </div>
          <span class="maintenance-dispatch-status">Local demo dispatch</span>
        </div>
        <p class="maintenance-dispatch-note">Live dispatch, GPS, tenant-sensitive storage, and billing are locked until backend/security gates are complete.</p>
        ${summaryGrid}
        <p class="maintenance-dispatch-empty">No saved maintenance/HVAC dispatch demo records yet.</p>
      </section>
    `;
  }

  const requestRows = requests
    .map((request, index) => {
      const currentStatus = getMaintenanceStatus(request);
      const statusOptions = MAINTENANCE_DISPATCH_STATUSES.map(
        (status) =>
          `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
      ).join("");

      return `
        <article class="maintenance-dispatch-card">
          <div>
            <strong>${escapeHtml(getMaintenanceTitle(request))}</strong>
            <span>${escapeHtml(request.propertyProject || "Unassigned property/project")}</span>
            <span>${escapeHtml(getMaintenancePriority(request))} priority · ${escapeHtml(getMaintenanceTrade(request))} · ${escapeHtml(request.assignedTechnician || "Unassigned technician")}</span>
            <span>${escapeHtml(formatCurrency(request.estimatedCost))} estimated repair cost</span>
          </div>
          <label>
            <span>Dispatch status</span>
            <select data-maintenance-status-index="${index}" aria-label="Dispatch status for ${escapeHtml(getMaintenanceTitle(request))}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="maintenance-dispatch-panel" aria-label="Maintenance and HVAC dispatch panel">
      <div class="maintenance-dispatch-header">
        <div>
          <p class="eyebrow">Dispatch Panel</p>
          <h4>Maintenance + HVAC Summary</h4>
        </div>
        <span class="maintenance-dispatch-status">Local demo dispatch</span>
      </div>
      <p class="maintenance-dispatch-note">Live dispatch, GPS, tenant-sensitive storage, and billing are locked until backend/security gates are complete.</p>
      ${summaryGrid}
      <div class="maintenance-dispatch-list">${requestRows}</div>
    </section>
  `;
}

function updateMaintenanceStatus(index, nextStatus) {
  const request = demoData.maintenancePlusHvac?.[index];

  if (!request || !MAINTENANCE_DISPATCH_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getMaintenanceStatus(request);

  if (previousStatus === nextStatus) {
    return;
  }

  request.status = nextStatus;
  saveDemoData();
  addMaintenanceStatusActivity(request, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("maintenance-plus-hvac");
}

function renderScheduleTasksPanel(tasks) {
  const summary = getScheduleSummary(tasks);
  const summaryGrid = `
    <div class="schedule-summary-grid" aria-label="Schedule task summary">
      <article><strong>${summary.total}</strong><span>Total tasks</span></article>
      <article><strong>${summary.urgent}</strong><span>Urgent tasks</span></article>
      <article><strong>${summary.inProgress}</strong><span>In-progress tasks</span></article>
      <article><strong>${summary.waiting}</strong><span>Waiting tasks</span></article>
      <article><strong>${summary.completed}</strong><span>Completed tasks</span></article>
    </div>
  `;

  if (!tasks.length) {
    return `
      <section class="schedule-tasks-panel" aria-label="Schedule and tasks panel">
        <div class="schedule-tasks-header">
          <div>
            <p class="eyebrow">Schedule Summary</p>
            <h4>Schedule / Tasks Panel</h4>
          </div>
          <span class="schedule-task-status">Local demo schedule</span>
        </div>
        <p class="schedule-task-lock-note">${SCHEDULE_TASK_LOCK_NOTE}</p>
        ${summaryGrid}
        <p class="schedule-task-empty">No saved schedule task demo records yet.</p>
      </section>
    `;
  }

  const taskRows = tasks
    .map((task, index) => {
      const currentStatus = getScheduleTaskStatus(task);
      const statusOptions = SCHEDULE_TASK_STATUSES.map(
        (status) =>
          `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
      ).join("");

      return `
        <article class="schedule-task-card">
          <div>
            <strong>${escapeHtml(getScheduleTaskTitle(task))}</strong>
            <span>${escapeHtml(getScheduleTaskProject(task))} · ${escapeHtml(getScheduleTaskAssignee(task))}</span>
            <span>${escapeHtml(getScheduleTaskPriority(task))} priority · Due ${escapeHtml(formatScheduleDueDate(task.dueDate))}</span>
          </div>
          <label>
            <span>Status</span>
            <select data-schedule-status-index="${index}" aria-label="Task status for ${escapeHtml(getScheduleTaskTitle(task))}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="schedule-tasks-panel" aria-label="Schedule and tasks panel">
      <div class="schedule-tasks-header">
        <div>
          <p class="eyebrow">Schedule Summary</p>
          <h4>Schedule / Tasks Panel</h4>
        </div>
        <span class="schedule-task-status">Local demo schedule</span>
      </div>
      <p class="schedule-task-lock-note">${SCHEDULE_TASK_LOCK_NOTE}</p>
      ${summaryGrid}
      <div class="schedule-task-list">${taskRows}</div>
    </section>
  `;
}

function updateScheduleTaskStatus(index, nextStatus) {
  const task = demoData.scheduleTasks?.[index];

  if (!task || !SCHEDULE_TASK_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getScheduleTaskStatus(task);

  if (previousStatus === nextStatus) {
    return;
  }

  task.status = nextStatus;
  saveDemoData();
  addScheduleStatusActivity(task, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("schedule-tasks");
}

function renderInventoryToolCheckoutPanel(items) {
  const summary = getInventoryToolSummary(items);
  const summaryGrid = `
    <div class="inventory-summary-grid" aria-label="Inventory summary">
      <article><strong>${summary.total}</strong><span>Total items</span></article>
      <article><strong>${summary.available}</strong><span>Available items</span></article>
      <article><strong>${summary.checkedOut}</strong><span>Checked out items</span></article>
      <article><strong>${summary.assignedToJob}</strong><span>Assigned-to-job items</span></article>
      <article><strong>${summary.lostDamaged}</strong><span>Lost/damaged items</span></article>
    </div>
  `;

  if (!items.length) {
    return `
      <section class="inventory-checkout-panel" aria-label="Inventory and tool checkout panel">
        <div class="inventory-checkout-header">
          <div>
            <p class="eyebrow">Inventory / Tool Checkout</p>
            <h4>Inventory Summary</h4>
          </div>
          <span class="inventory-checkout-status">Local demo checkout</span>
        </div>
        <p class="inventory-lock-note">Live scanner hardware, GPS, purchasing sync, and accounting impact are locked until backend/security gates are complete.</p>
        ${summaryGrid}
        <p class="inventory-checkout-empty">No saved inventory/tool demo records yet.</p>
      </section>
    `;
  }

  const itemRows = items
    .map((item, index) => {
      const currentStatus = getInventoryToolStatus(item);
      const statusOptions = INVENTORY_TOOL_STATUSES.map(
        (status) =>
          `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
      ).join("");

      return `
        <article class="inventory-checkout-card">
          <div>
            <strong>${escapeHtml(item.name || "Inventory item")}</strong>
            <span>${escapeHtml(item.tag || "No tag / QR code")}</span>
            <span>${escapeHtml(item.holder || "No holder / worker / truck")}</span>
            <span>${escapeHtml(item.project || "Unassigned project")}</span>
          </div>
          <label>
            <span>Status</span>
            <select data-inventory-status-index="${index}" aria-label="Inventory status for ${escapeHtml(item.name || "inventory item")}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="inventory-checkout-panel" aria-label="Inventory and tool checkout panel">
      <div class="inventory-checkout-header">
        <div>
          <p class="eyebrow">Inventory / Tool Checkout</p>
          <h4>Inventory Summary</h4>
        </div>
        <span class="inventory-checkout-status">Local demo checkout</span>
      </div>
      <p class="inventory-lock-note">Live scanner hardware, GPS, purchasing sync, and accounting impact are locked until backend/security gates are complete.</p>
      ${summaryGrid}
      <div class="inventory-checkout-list">${itemRows}</div>
    </section>
  `;
}

function updateInventoryToolStatus(index, nextStatus) {
  const item = demoData.inventoryTools?.[index];

  if (!item || !INVENTORY_TOOL_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getInventoryToolStatus(item);

  if (previousStatus === nextStatus) {
    return;
  }

  item.status = nextStatus;
  saveDemoData();
  addInventoryToolStatusActivity(item, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("inventory-tools");
}

function renderWalkthroughCapturePanel(records) {
  const summary = getWalkthroughSummary(records);
  const summaryGrid = `
    <div class="walkthrough-summary-grid" aria-label="Field walkthrough estimate readiness summary">
      <article><strong>${summary.total}</strong><span>Total captures</span></article>
      <article><strong>${summary.draftCapture}</strong><span>Draft capture</span></article>
      <article><strong>${summary.officeReview}</strong><span>Needs office review</span></article>
      <article><strong>${summary.readyForEstimate}</strong><span>Ready for estimate</span></article>
      <article><strong>${summary.sentToProposal}</strong><span>Sent to proposal</span></article>
    </div>
  `;

  const lockedNote =
    "Live camera, voice capture, AI measurements, and backend estimate generation are locked until backend/security gates are complete.";

  if (!records.length) {
    return `
      <section class="walkthrough-capture-panel" aria-label="Field Walkthrough panel">
        <div class="walkthrough-capture-header">
          <div>
            <p class="eyebrow">Field Walkthrough</p>
            <h4>Jobsite Capture</h4>
          </div>
          <span class="walkthrough-capture-status">Local demo capture</span>
        </div>
        <p class="walkthrough-lock-note">${lockedNote}</p>
        ${summaryGrid}
        <p class="walkthrough-capture-empty">No saved field walkthrough demo records yet.</p>
      </section>
    `;
  }

  const recordRows = records
    .map((record, index) => {
      const currentStatus = getWalkthroughStatus(record);
      const statusOptions = WALKTHROUGH_READINESS_STATUSES.map(
        (status) =>
          `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
      ).join("");

      return `
        <article class="walkthrough-capture-card">
          <div>
            <strong>${escapeHtml(getWalkthroughProject(record))}</strong>
            <span>Customer notes: ${escapeHtml(record.customerNotes || "Pending")}</span>
            <span>Voice summary: ${escapeHtml(record.voiceNoteSummary || "Typed demo summary pending")}</span>
            <span>Measurements: ${escapeHtml(record.measurementNotes || "Measurement notes pending")}</span>
            <span>Scope draft: ${escapeHtml(record.scopeDraft || "Scope draft pending")}</span>
            <span>Photo / proof: ${escapeHtml(record.photoProofPlaceholder || "Placeholder text pending")}</span>
          </div>
          <label>
            <span>Estimate readiness</span>
            <select data-walkthrough-status-index="${index}" aria-label="Estimate readiness status for ${escapeHtml(getWalkthroughProject(record))}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="walkthrough-capture-panel" aria-label="Field Walkthrough panel">
      <div class="walkthrough-capture-header">
        <div>
          <p class="eyebrow">Field Walkthrough</p>
          <h4>Jobsite Capture</h4>
        </div>
        <span class="walkthrough-capture-status">Local demo capture</span>
      </div>
      <p class="walkthrough-lock-note">${lockedNote}</p>
      ${summaryGrid}
      <div class="walkthrough-capture-list">${recordRows}</div>
    </section>
  `;
}

function updateWalkthroughStatus(index, nextStatus) {
  const record = demoData.fieldWalkthrough?.[index];

  if (!record || !WALKTHROUGH_READINESS_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getWalkthroughStatus(record);

  if (previousStatus === nextStatus) {
    return;
  }

  record.readinessStatus = nextStatus;
  saveDemoData();
  addWalkthroughStatusActivity(record, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("field-walkthrough");
}

function renderCustomerPortalPanel(records) {
  const summary = getCustomerPortalSummary(records);
  const summaryGrid = `
    <div class="customer-summary-grid" aria-label="Customer Portal Summary">
      <article><strong>${summary.total}</strong><span>Total customer requests</span></article>
      <article><strong>${summary.officeReview}</strong><span>Needs office review</span></article>
      <article><strong>${summary.waitingOnOwner}</strong><span>Waiting on owner</span></article>
      <article><strong>${summary.approved}</strong><span>Approved requests</span></article>
      <article><strong>${summary.closed}</strong><span>Closed requests</span></article>
    </div>
  `;

  if (!records.length) {
    return `
      <section class="customer-portal-panel" aria-label="Customer / Homeowner Portal panel">
        <div class="customer-portal-header">
          <div>
            <p class="eyebrow">Customer Portal</p>
            <h4>Homeowner Requests</h4>
          </div>
          <span class="customer-portal-status">Local demo portal</span>
        </div>
        <p class="customer-portal-lock-note">${CUSTOMER_PORTAL_LOCK_NOTE}</p>
        ${summaryGrid}
        <p class="customer-portal-empty">No saved customer portal demo requests yet.</p>
      </section>
    `;
  }

  const requestRows = records
    .map((record, index) => {
      const currentStatus = getCustomerPortalStatus(record);
      const statusOptions = CUSTOMER_PORTAL_APPROVAL_STATUSES.map(
        (status) =>
          `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
      ).join("");

      return `
        <article class="customer-portal-card">
          <div>
            <strong>${escapeHtml(getCustomerPortalTitle(record))}</strong>
            <span>${escapeHtml(getCustomerPortalProject(record))} · ${escapeHtml(getCustomerPortalRequestType(record))}</span>
            <span>${escapeHtml(record.messageNotes || "Request notes pending")}</span>
          </div>
          <label>
            <span>Approval status</span>
            <select data-customer-portal-status-index="${index}" aria-label="Customer portal approval status for ${escapeHtml(getCustomerPortalTitle(record))}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="customer-portal-panel" aria-label="Customer / Homeowner Portal panel">
      <div class="customer-portal-header">
        <div>
          <p class="eyebrow">Customer Portal</p>
          <h4>Homeowner Requests</h4>
        </div>
        <span class="customer-portal-status">Local demo portal</span>
      </div>
      <p class="customer-portal-lock-note">${CUSTOMER_PORTAL_LOCK_NOTE}</p>
      ${summaryGrid}
      <div class="customer-portal-list">${requestRows}</div>
    </section>
  `;
}

function updateCustomerPortalStatus(index, nextStatus) {
  const record = demoData.customerPortal?.[index];

  if (!record || !CUSTOMER_PORTAL_APPROVAL_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getCustomerPortalStatus(record);

  if (previousStatus === nextStatus) {
    return;
  }

  record.approvalStatus = nextStatus;
  saveDemoData();
  addCustomerPortalStatusActivity(record, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("customer-homeowner-portal");
}


function renderEstimatesPanel(records) {
  const summary = getEstimateSummary(records);
  const summaryGrid = `
    <div class="estimate-summary-grid" aria-label="Estimate Summary">
      <article><strong>${escapeHtml(formatCurrency(summary.totalAmount))}</strong><span>Total estimate amount</span></article>
      <article><strong>${summary.draft}</strong><span>Draft count</span></article>
      <article><strong>${summary.officeReview}</strong><span>Office review count</span></article>
      <article><strong>${summary.sent}</strong><span>Sent count</span></article>
      <article><strong>${summary.approved}</strong><span>Approved count</span></article>
      <article><strong>${summary.changeOrder}</strong><span>Change order count</span></article>
    </div>
  `;

  if (!records.length) {
    return `
      <section class="estimates-panel" aria-label="Estimates / Proposals panel">
        <div class="estimates-header">
          <div>
            <p class="eyebrow">Estimates / Proposals</p>
            <h4>Estimate Summary</h4>
          </div>
          <span class="estimates-status">Local demo proposals</span>
        </div>
        <p class="estimates-lock-note">${ESTIMATE_LOCK_NOTE}</p>
        ${summaryGrid}
        <p class="estimates-empty">No saved estimate, proposal, or change-order demo records yet.</p>
      </section>
    `;
  }

  const recordRows = records
    .map((record, index) => {
      const currentStatus = getEstimateStatus(record);
      const statusOptions = ESTIMATE_STATUSES.map(
        (status) =>
          `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
      ).join("");

      return `
        <article class="estimate-card">
          <div>
            <strong>${escapeHtml(getEstimateTitle(record))}</strong>
            <span>${escapeHtml(getEstimateProject(record))} · ${escapeHtml(getEstimateCustomerInvestor(record))}</span>
            <span>${escapeHtml(getEstimateTier(record))} tier · ${escapeHtml(formatCurrency(record.amount))}</span>
            <span>${escapeHtml(record.scopeSummary || "Scope summary pending")}</span>
          </div>
          <label>
            <span>Status</span>
            <select data-estimate-status-index="${index}" aria-label="Estimate status for ${escapeHtml(getEstimateTitle(record))}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="estimates-panel" aria-label="Estimates / Proposals panel">
      <div class="estimates-header">
        <div>
          <p class="eyebrow">Estimates / Proposals</p>
          <h4>Estimate Summary</h4>
        </div>
        <span class="estimates-status">Local demo proposals</span>
      </div>
      <p class="estimates-lock-note">${ESTIMATE_LOCK_NOTE}</p>
      ${summaryGrid}
      <div class="estimate-list">${recordRows}</div>
    </section>
  `;
}

function updateEstimateStatus(index, nextStatus) {
  const record = demoData.estimatesProposals?.[index];

  if (!record || !ESTIMATE_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getEstimateStatus(record);

  if (previousStatus === nextStatus) {
    return;
  }

  record.status = nextStatus;
  saveDemoData();
  addEstimateStatusActivity(record, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("estimates-proposals-change-orders");
}


function renderOwnerApprovalsPanel(records) {
  const summary = getOwnerApprovalSummary(records);
  const summaryGrid = `
    <div class="owner-approval-summary-grid" aria-label="Approvals Summary">
      <article><strong>${summary.total}</strong><span>Total approval items</span></article>
      <article><strong>${summary.pending}</strong><span>Pending count</span></article>
      <article><strong>${summary.officeReview}</strong><span>Office review count</span></article>
      <article><strong>${summary.approved}</strong><span>Approved count</span></article>
      <article><strong>${summary.accountingHold}</strong><span>Accounting hold count</span></article>
      <article><strong>${escapeHtml(formatCurrency(summary.totalAmountUnderReview))}</strong><span>Total amount under review</span></article>
    </div>
  `;
  const rows = records.length
    ? records
        .map((record, index) => {
          const currentStatus = getOwnerApprovalStatus(record);
          const statusOptions = OWNER_APPROVAL_STATUSES.map(
            (status) =>
              `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
          ).join("");

          return `
            <article class="owner-approval-card">
              <div>
                <strong>${escapeHtml(getOwnerApprovalTitle(record))}</strong>
                <span>${escapeHtml(getOwnerApprovalProject(record))} · ${escapeHtml(getOwnerApprovalType(record))} · ${escapeHtml(formatCurrency(record.amount))}</span>
                <span>Requested by ${escapeHtml(record.requestedBy || "Unassigned requester")}</span>
                <span>${escapeHtml(record.notes || "No approval notes saved yet.")}</span>
              </div>
              <label>
                <span>Status</span>
                <select data-owner-approval-status-index="${index}" aria-label="Update approval status for ${escapeHtml(getOwnerApprovalTitle(record))}">
                  ${statusOptions}
                </select>
              </label>
            </article>
          `;
        })
        .join("")
    : '<p class="owner-approval-empty">No saved owner approval demo records yet.</p>';

  return `
    <section class="owner-approvals-panel" aria-label="Owner Approvals / Review Queue panel">
      <div class="owner-approvals-header">
        <div>
          <p class="eyebrow">Owner Approvals / Review Queue</p>
          <h4>Approvals Summary</h4>
        </div>
        <span class="owner-approvals-status">Local demo queue</span>
      </div>
      <p class="owner-approvals-lock-note">${OWNER_APPROVAL_LOCK_NOTE}</p>
      ${summaryGrid}
      <div class="owner-approval-list">${rows}</div>
    </section>
  `;
}

function updateOwnerApprovalStatus(index, nextStatus) {
  const record = demoData.ownerApprovals?.[index];

  if (!record || !OWNER_APPROVAL_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getOwnerApprovalStatus(record);

  if (previousStatus === nextStatus) {
    return;
  }

  record.status = nextStatus;
  saveDemoData();
  addOwnerApprovalStatusActivity(record, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("owner-approvals-review-queue");
}

function renderDocumentsPanel(records) {
  const summary = getDocumentSummary(records);
  const summaryGrid = `
    <div class="documents-summary-grid" aria-label="Documents Summary">
      <article><strong>${summary.total}</strong><span>Total documents</span></article>
      <article><strong>${summary.permits}</strong><span>Permits</span></article>
      <article><strong>${summary.inspections}</strong><span>Inspections</span></article>
      <article><strong>${summary.insurance}</strong><span>Insurance documents</span></article>
      <article><strong>${summary.photoProof}</strong><span>Photo proof records</span></article>
      <article><strong>${summary.needsReview}</strong><span>Needs review count</span></article>
      <article><strong>${summary.missing}</strong><span>Missing count</span></article>
    </div>
  `;

  if (!records.length) {
    return `
      <section class="documents-panel" aria-label="Job Documents / Evidence Binder panel">
        <div class="documents-header">
          <div>
            <p class="eyebrow">Evidence Binder</p>
            <h4>Documents Summary</h4>
          </div>
          <span class="documents-status">Local demo binder</span>
        </div>
        <p class="documents-lock-note">${DOCUMENT_LOCK_NOTE}</p>
        ${summaryGrid}
        <p class="documents-empty">No saved job document demo records yet.</p>
      </section>
    `;
  }

  const documentRows = records
    .map((record, index) => {
      const currentStatus = getDocumentStatus(record);
      const statusOptions = DOCUMENT_STATUSES.map(
        (status) =>
          `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
      ).join("");

      return `
        <article class="documents-card">
          <div>
            <strong>${escapeHtml(getDocumentTitle(record))}</strong>
            <span>${escapeHtml(getDocumentProject(record))} · ${escapeHtml(getDocumentType(record))}</span>
            <span>${escapeHtml(record.notes || "Document notes pending")}</span>
          </div>
          <label>
            <span>Status</span>
            <select data-document-status-index="${index}" aria-label="Document status for ${escapeHtml(getDocumentTitle(record))}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="documents-panel" aria-label="Job Documents / Evidence Binder panel">
      <div class="documents-header">
        <div>
          <p class="eyebrow">Evidence Binder</p>
          <h4>Documents Summary</h4>
        </div>
        <span class="documents-status">Local demo binder</span>
      </div>
      <p class="documents-lock-note">${DOCUMENT_LOCK_NOTE}</p>
      ${summaryGrid}
      <div class="documents-list">${documentRows}</div>
    </section>
  `;
}

function updateDocumentStatus(index, nextStatus) {
  const record = demoData.jobDocuments?.[index];

  if (!record || !DOCUMENT_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getDocumentStatus(record);

  if (previousStatus === nextStatus) {
    return;
  }

  record.status = nextStatus;
  saveDemoData();
  addDocumentStatusActivity(record, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("job-documents-evidence-binder");
}

function renderBugCapturePanel(records) {
  const summary = getBugSummary(records);
  const summaryGrid = `
    <div class="bug-summary-grid" aria-label="Bug Summary">
      <article><strong>${summary.total}</strong><span>Total bugs</span></article>
      <article><strong>${summary.newBugs}</strong><span>New bugs</span></article>
      <article><strong>${summary.highCritical}</strong><span>High / critical bugs</span></article>
      <article><strong>${summary.fixed}</strong><span>Fixed bugs</span></article>
      <article><strong>${summary.retestNeeded}</strong><span>Retest needed count</span></article>
    </div>
  `;

  if (!records.length) {
    return `
      <section class="bug-capture-panel" aria-label="Bug Capture / QA Issue Log panel">
        <div class="bug-capture-header">
          <div>
            <p class="eyebrow">Bug Capture / QA Issue Log</p>
            <h4>Bug Summary</h4>
          </div>
          <span class="bug-capture-status">Local QA prototype</span>
        </div>
        <p class="bug-capture-lock-note">${BUG_QA_LOCK_NOTE}</p>
        ${summaryGrid}
        <p class="bug-capture-empty">No saved bug demo records yet.</p>
      </section>
    `;
  }

  const bugRows = records
    .map((record, index) => {
      const currentStatus = getBugStatus(record);
      const statusOptions = BUG_STATUSES.map(
        (status) =>
          `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
      ).join("");

      return `
        <article class="bug-capture-card">
          <div>
            <strong>${escapeHtml(getBugTitle(record))}</strong>
            <span>${escapeHtml(getBugModuleArea(record))} · ${escapeHtml(getBugSeverity(record))} severity</span>
            <span>Steps: ${escapeHtml(record.stepsToReproduce || "Steps to reproduce pending")}</span>
            <span>${escapeHtml(record.notes || "QA notes pending")}</span>
          </div>
          <label>
            <span>Status</span>
            <select data-bug-status-index="${index}" aria-label="Bug status for ${escapeHtml(getBugTitle(record))}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="bug-capture-panel" aria-label="Bug Capture / QA Issue Log panel">
      <div class="bug-capture-header">
        <div>
          <p class="eyebrow">Bug Capture / QA Issue Log</p>
          <h4>Bug Summary</h4>
        </div>
        <span class="bug-capture-status">Local QA prototype</span>
      </div>
      <p class="bug-capture-lock-note">${BUG_QA_LOCK_NOTE}</p>
      ${summaryGrid}
      <div class="bug-capture-list">${bugRows}</div>
    </section>
  `;
}

function updateBugStatus(index, nextStatus) {
  const record = demoData.bugCapture?.[index];

  if (!record || !BUG_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getBugStatus(record);

  if (previousStatus === nextStatus) {
    return;
  }

  record.status = nextStatus;
  saveDemoData();
  addBugStatusActivity(record, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("bug-capture-qa-issue-log");
}

function renderAccountingReviewPanel() {
  const summary = getDailyAccountingSummary();
  const currentStatus = getAccountingReviewStatus(accountingReview);
  const statusOptions = ACCOUNTING_REVIEW_STATUSES.map(
    (status) =>
      `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
  ).join("");
  const lastSaved = accountingReview.updatedAt
    ? `Last saved ${formatActivityTime(accountingReview.updatedAt)}`
    : "Local review not saved yet";

  return `
    <section class="accounting-review-panel" aria-label="Daily P&L / Accounting Review panel">
      <div class="accounting-review-header">
        <div>
          <p class="eyebrow">Daily P&amp;L / Accounting Review</p>
          <h4>Local Demo Gross Preview</h4>
        </div>
        <span class="accounting-review-status-pill">Review only</span>
      </div>
      <p class="accounting-review-lock-note">${ACCOUNTING_REVIEW_LOCK_NOTE}</p>
      <div class="accounting-review-summary-grid" aria-label="Daily P&L demo totals">
        <article><strong>${escapeHtml(formatCurrency(summary.approvedEstimateAmount))}</strong><span>Total approved estimate amount</span></article>
        <article><strong>${escapeHtml(formatCurrency(summary.totalReceiptCost))}</strong><span>Total receipt cost</span></article>
        <article><strong>${escapeHtml(formatCurrency(summary.totalPayrollPrepCost))}</strong><span>Total payroll prep cost</span></article>
        <article><strong>${escapeHtml(formatCurrency(summary.totalMaintenanceEstimatedRepairCost))}</strong><span>Total maintenance estimated repair cost</span></article>
        <article><strong>${escapeHtml(formatCurrency(summary.demoGrossPreview))}</strong><span>Demo gross preview</span></article>
      </div>
      <form class="accounting-review-form" data-accounting-review-form>
        <label>
          <span>Accounting review status</span>
          <select data-accounting-review-status aria-label="Accounting review status">
            ${statusOptions}
          </select>
        </label>
        <label class="accounting-review-notes-label">
          <span>Review notes</span>
          <textarea
            data-accounting-review-notes
            rows="4"
            placeholder="Add receipt gaps, office review items, owner approval notes, or accountant handoff reminders."
          >${escapeHtml(accountingReview.notes)}</textarea>
        </label>
        <div class="accounting-review-actions">
          <button type="submit">Save accounting review</button>
          <span data-accounting-review-saved>${escapeHtml(lastSaved)}</span>
        </div>
      </form>
    </section>
  `;
}

function updateAccountingReviewStatus(nextStatus) {
  if (!ACCOUNTING_REVIEW_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getAccountingReviewStatus(accountingReview);

  if (previousStatus === nextStatus) {
    accountingReview.status = nextStatus;
    saveAccountingReview();
    return;
  }

  accountingReview.status = nextStatus;
  saveAccountingReview();
  addAccountingReviewStatusActivity(previousStatus, nextStatus);
  renderModules();
}

function saveAccountingReviewNotes(notes) {
  accountingReview.notes = String(notes ?? "").trim();
  saveAccountingReview();
}

function bindAccountingReviewPanel() {
  const statusSelect = detailDemo.querySelector("[data-accounting-review-status]");
  const notesInput = detailDemo.querySelector("[data-accounting-review-notes]");
  const form = detailDemo.querySelector("[data-accounting-review-form]");
  const savedText = detailDemo.querySelector("[data-accounting-review-saved]");

  if (statusSelect) {
    statusSelect.addEventListener("change", () => {
      updateAccountingReviewStatus(statusSelect.value);
      if (savedText) {
        savedText.textContent = `Saved ${formatActivityTime(accountingReview.updatedAt)}`;
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      saveAccountingReviewNotes(notesInput?.value ?? "");
      if (savedText) {
        savedText.textContent = `Saved ${formatActivityTime(accountingReview.updatedAt)}`;
      }
    });
  }
}

function renderPayrollPrepPanel(records) {
  const summary = getPayrollPrepSummary(records);
  const summaryGrid = `
    <div class="payroll-summary-grid" aria-label="Payroll prep summary">
      <article><strong>${escapeHtml(formatCurrency(summary.totalLaborCost))}</strong><span>Total labor cost</span></article>
      <article><strong>${summary.draft}</strong><span>Draft records</span></article>
      <article><strong>${summary.officeReview}</strong><span>Office review records</span></article>
      <article><strong>${summary.approvedHold}</strong><span>Approved hold records</span></article>
    </div>
  `;

  if (!records.length) {
    return `
      <section class="payroll-prep-panel" aria-label="Payroll prep labor hold panel">
        <div class="payroll-prep-header">
          <div>
            <p class="eyebrow">Labor Hold</p>
            <h4>Payroll Prep Summary</h4>
          </div>
          <span class="payroll-lock-status">Prep only</span>
        </div>
        <p class="payroll-lock-note">Payroll processing is locked. This is prep/review data only.</p>
        ${summaryGrid}
        <p class="payroll-prep-empty">No saved payroll/labor demo records yet.</p>
      </section>
    `;
  }

  const recordRows = records
    .map((record, index) => {
      const currentStatus = getPayrollStatus(record);
      const statusOptions = PAYROLL_PREP_STATUSES.map(
        (status) =>
          `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
      ).join("");

      return `
        <article class="payroll-prep-card">
          <div>
            <strong>${escapeHtml(record.workerName || "Worker")}</strong>
            <span>${escapeHtml(record.project || "Unassigned project")} · ${Number(record.hours) || 0} hrs × ${escapeHtml(formatCurrency(record.rate))} · ${escapeHtml(formatCurrency(getLaborCost(record)))}</span>
          </div>
          <label>
            <span>Status</span>
            <select data-payroll-status-index="${index}" aria-label="Payroll prep status for ${escapeHtml(record.workerName || "worker")}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="payroll-prep-panel" aria-label="Payroll prep labor hold panel">
      <div class="payroll-prep-header">
        <div>
          <p class="eyebrow">Labor Hold</p>
          <h4>Payroll Prep Summary</h4>
        </div>
        <span class="payroll-lock-status">Prep only</span>
      </div>
      <p class="payroll-lock-note">Payroll processing is locked. This is prep/review data only.</p>
      ${summaryGrid}
      <div class="payroll-prep-list">${recordRows}</div>
    </section>
  `;
}

function updatePayrollStatus(index, nextStatus) {
  const record = demoData.payrollPrep?.[index];

  if (!record || !PAYROLL_PREP_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getPayrollStatus(record);

  if (previousStatus === nextStatus) {
    return;
  }

  record.status = nextStatus;
  saveDemoData();
  addPayrollStatusActivity(record, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("payroll-prep");
}

function renderDemoList(moduleId) {
  const demoModule = demoModules[moduleId];
  const items = demoData[demoModule.storageKey] ?? [];
  const list = detailDemo.querySelector("[data-demo-list]");
  const projectFolderSlot = detailDemo.querySelector("[data-project-folder]");
  const receiptReviewSlot = detailDemo.querySelector("[data-receipt-review]");
  const payrollPrepSlot = detailDemo.querySelector("[data-payroll-prep]");
  const maintenanceDispatchSlot = detailDemo.querySelector(
    "[data-maintenance-dispatch]",
  );
  const scheduleTasksSlot = detailDemo.querySelector("[data-schedule-tasks]");
  const inventoryCheckoutSlot = detailDemo.querySelector(
    "[data-inventory-checkout]",
  );
  const walkthroughCaptureSlot = detailDemo.querySelector(
    "[data-walkthrough-capture]",
  );
  const customerPortalSlot = detailDemo.querySelector(
    "[data-customer-portal]",
  );
  const estimatesSlot = detailDemo.querySelector("[data-estimates]");
  const ownerApprovalsSlot = detailDemo.querySelector("[data-owner-approvals]");
  const documentsSlot = detailDemo.querySelector("[data-documents]");
  const bugCaptureSlot = detailDemo.querySelector("[data-bug-capture]");

  if (!items.length) {
    list.innerHTML = `<li class="demo-empty">${demoModule.empty}</li>`;
    if (projectFolderSlot) {
      projectFolderSlot.innerHTML = renderProjectFolder(null);
    }
    if (receiptReviewSlot) {
      receiptReviewSlot.innerHTML = renderReceiptReviewPanel(items);
    }
    if (payrollPrepSlot) {
      payrollPrepSlot.innerHTML = renderPayrollPrepPanel(items);
    }
    if (maintenanceDispatchSlot) {
      maintenanceDispatchSlot.innerHTML = renderMaintenanceDispatchPanel(items);
    }
    if (scheduleTasksSlot) {
      scheduleTasksSlot.innerHTML = renderScheduleTasksPanel(items);
    }
    if (inventoryCheckoutSlot) {
      inventoryCheckoutSlot.innerHTML = renderInventoryToolCheckoutPanel(items);
    }
    if (walkthroughCaptureSlot) {
      walkthroughCaptureSlot.innerHTML = renderWalkthroughCapturePanel(items);
    }
    if (customerPortalSlot) {
      customerPortalSlot.innerHTML = renderCustomerPortalPanel(items);
    }
    if (estimatesSlot) {
      estimatesSlot.innerHTML = renderEstimatesPanel(items);
    }
    if (ownerApprovalsSlot) {
      ownerApprovalsSlot.innerHTML = renderOwnerApprovalsPanel(items);
    }
    if (documentsSlot) {
      documentsSlot.innerHTML = renderDocumentsPanel(items);
    }
    if (bugCaptureSlot) {
      bugCaptureSlot.innerHTML = renderBugCapturePanel(items);
    }
    return;
  }

  if (moduleId === "projects" && !getSelectedProject(items)) {
    saveSelectedProject(items[0].name);
  }

  list.innerHTML = items
    .map((item) => {
      const formattedItem = demoModule.format(item);
      const isSelectedProject =
        moduleId === "projects" && item.name === selectedProjectName;

      return `
        <li class="${moduleId === "projects" ? "project-list-item" : ""} ${isSelectedProject ? "selected" : ""}">
          <div>
            <strong>${escapeHtml(formattedItem.title)}</strong>
            <span>${escapeHtml(formattedItem.meta)}</span>
          </div>
          ${
            moduleId === "projects"
              ? `<button type="button" class="ghost-button project-select" data-project-select="${escapeHtml(item.name)}">${
                  isSelectedProject ? "Selected" : "Open job folder"
                }</button>`
              : ""
          }
        </li>
      `;
    })
    .join("");

  list.querySelectorAll("[data-project-select]").forEach((button) => {
    button.addEventListener("click", () => {
      saveSelectedProject(button.dataset.projectSelect);
      renderDemoList(moduleId);
    });
  });

  if (projectFolderSlot) {
    projectFolderSlot.innerHTML = renderProjectFolder(
      getSelectedProject(items),
    );
  }

  if (receiptReviewSlot) {
    receiptReviewSlot.innerHTML = renderReceiptReviewPanel(items);
    receiptReviewSlot
      .querySelectorAll("[data-receipt-status-index]")
      .forEach((select) => {
        select.addEventListener("change", () =>
          updateReceiptStatus(
            Number(select.dataset.receiptStatusIndex),
            select.value,
          ),
        );
      });
  }

  if (payrollPrepSlot) {
    payrollPrepSlot.innerHTML = renderPayrollPrepPanel(items);
    payrollPrepSlot
      .querySelectorAll("[data-payroll-status-index]")
      .forEach((select) => {
        select.addEventListener("change", () =>
          updatePayrollStatus(
            Number(select.dataset.payrollStatusIndex),
            select.value,
          ),
        );
      });
  }

  if (maintenanceDispatchSlot) {
    maintenanceDispatchSlot.innerHTML = renderMaintenanceDispatchPanel(items);
    maintenanceDispatchSlot
      .querySelectorAll("[data-maintenance-status-index]")
      .forEach((select) => {
        select.addEventListener("change", () =>
          updateMaintenanceStatus(
            Number(select.dataset.maintenanceStatusIndex),
            select.value,
          ),
        );
      });
  }

  if (scheduleTasksSlot) {
    scheduleTasksSlot.innerHTML = renderScheduleTasksPanel(items);
    scheduleTasksSlot
      .querySelectorAll("[data-schedule-status-index]")
      .forEach((select) => {
        select.addEventListener("change", () =>
          updateScheduleTaskStatus(
            Number(select.dataset.scheduleStatusIndex),
            select.value,
          ),
        );
      });
  }

  if (inventoryCheckoutSlot) {
    inventoryCheckoutSlot.innerHTML = renderInventoryToolCheckoutPanel(items);
    inventoryCheckoutSlot
      .querySelectorAll("[data-inventory-status-index]")
      .forEach((select) => {
        select.addEventListener("change", () =>
          updateInventoryToolStatus(
            Number(select.dataset.inventoryStatusIndex),
            select.value,
          ),
        );
      });
  }

  if (walkthroughCaptureSlot) {
    walkthroughCaptureSlot.innerHTML = renderWalkthroughCapturePanel(items);
    walkthroughCaptureSlot
      .querySelectorAll("[data-walkthrough-status-index]")
      .forEach((select) => {
        select.addEventListener("change", () =>
          updateWalkthroughStatus(
            Number(select.dataset.walkthroughStatusIndex),
            select.value,
          ),
        );
      });
  }

  if (customerPortalSlot) {
    customerPortalSlot.innerHTML = renderCustomerPortalPanel(items);
    customerPortalSlot
      .querySelectorAll("[data-customer-portal-status-index]")
      .forEach((select) => {
        select.addEventListener("change", () =>
          updateCustomerPortalStatus(
            Number(select.dataset.customerPortalStatusIndex),
            select.value,
          ),
        );
      });
  }

  if (estimatesSlot) {
    estimatesSlot.innerHTML = renderEstimatesPanel(items);
    estimatesSlot
      .querySelectorAll("[data-estimate-status-index]")
      .forEach((select) => {
        select.addEventListener("change", () =>
          updateEstimateStatus(
            Number(select.dataset.estimateStatusIndex),
            select.value,
          ),
        );
      });
  }

  if (ownerApprovalsSlot) {
    ownerApprovalsSlot.innerHTML = renderOwnerApprovalsPanel(items);
    ownerApprovalsSlot
      .querySelectorAll("[data-owner-approval-status-index]")
      .forEach((select) => {
        select.addEventListener("change", () =>
          updateOwnerApprovalStatus(
            Number(select.dataset.ownerApprovalStatusIndex),
            select.value,
          ),
        );
      });
  }

  if (documentsSlot) {
    documentsSlot.innerHTML = renderDocumentsPanel(items);
    documentsSlot
      .querySelectorAll("[data-document-status-index]")
      .forEach((select) => {
        select.addEventListener("change", () =>
          updateDocumentStatus(
            Number(select.dataset.documentStatusIndex),
            select.value,
          ),
        );
      });
  }

  if (bugCaptureSlot) {
    bugCaptureSlot.innerHTML = renderBugCapturePanel(items);
    bugCaptureSlot
      .querySelectorAll("[data-bug-status-index]")
      .forEach((select) => {
        select.addEventListener("change", () =>
          updateBugStatus(Number(select.dataset.bugStatusIndex), select.value),
        );
      });
  }
}

function renderDemoModule(moduleId) {
  const demoModule = demoModules[moduleId];

  if (moduleId === "aquabona-investor-portal") {
    detailDemo.hidden = false;
    detailDemo.innerHTML = renderAquabonaInvestorPortal();
    detailDemo.querySelectorAll("[data-investor-category]").forEach((input) => {
      input.addEventListener("change", () =>
        updateInvestorVisibility(
          input.dataset.investorCategory,
          input.dataset.investorCategoryLabel,
          input.checked,
        ),
      );
    });
    return;
  }

  if (moduleId === "accounting-review") {
    detailDemo.hidden = false;
    detailDemo.innerHTML = renderAccountingReviewPanel();
    bindAccountingReviewPanel();
    return;
  }

  if (!demoModule) {
    detailDemo.hidden = true;
    detailDemo.replaceChildren();
    return;
  }

  const fields = demoModule.fields
    .map((field) => {
      const requiredAttribute = field.required ? "required" : "";

      if (field.projectOptions) {
        const projectOptions = (demoData.projects ?? [])
          .map((project) => String(project?.name ?? "").trim())
          .filter(Boolean);

        if (projectOptions.length) {
          const options = [...new Set(projectOptions)]
            .map(
              (option) =>
                `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`,
            )
            .join("");

          return `
            <label>
              <span>${field.label}</span>
              <select name="${field.name}" ${requiredAttribute}>
                ${options}
              </select>
            </label>
          `;
        }
      }

      if (field.options?.length) {
        const options = field.options
          .map(
            (option) =>
              `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`,
          )
          .join("");

        return `
          <label>
            <span>${field.label}</span>
            <select name="${field.name}" ${requiredAttribute}>
              ${options}
            </select>
          </label>
        `;
      }

      if (field.multiline) {
        return `
          <label class="demo-form-wide">
            <span>${field.label}</span>
            <textarea
              name="${field.name}"
              placeholder="${field.placeholder}"
              rows="3"
              ${requiredAttribute}
            ></textarea>
          </label>
        `;
      }

      return `
        <label>
          <span>${field.label}</span>
          <input
            name="${field.name}"
            type="${field.type ?? "text"}"
            placeholder="${field.placeholder}"
            ${field.step ? `step="${field.step}"` : ""}
            ${field.min ? `min="${field.min}"` : ""}
            ${requiredAttribute}
          />
        </label>
      `;
    })
    .join("");

  detailDemo.hidden = false;
  detailDemo.innerHTML = `
    <div class="demo-header">
      <div>
        <p class="eyebrow">${demoModule.eyebrow}</p>
        <h4>${getDemoCount(moduleId)} saved</h4>
      </div>
      <button type="button" class="ghost-button" data-reset-demo>Reset demo data</button>
    </div>
    <form class="demo-form" data-demo-form>
      ${fields}
      <button type="submit">${demoModule.submitLabel}</button>
    </form>
    <ul class="demo-list" data-demo-list></ul>
    ${moduleId === "projects" ? "<div data-project-folder></div>" : ""}
    ${moduleId === "receipts" ? "<div data-receipt-review></div>" : ""}
    ${moduleId === "payroll-prep" ? "<div data-payroll-prep></div>" : ""}
    ${moduleId === "maintenance-plus-hvac" ? "<div data-maintenance-dispatch></div>" : ""}
    ${moduleId === "schedule-tasks" ? "<div data-schedule-tasks></div>" : ""}
    ${moduleId === "inventory-tools" ? "<div data-inventory-checkout></div>" : ""}
    ${moduleId === "field-walkthrough" ? "<div data-walkthrough-capture></div>" : ""}
    ${moduleId === "customer-homeowner-portal" ? "<div data-customer-portal></div>" : ""}
    ${moduleId === "estimates-proposals-change-orders" ? "<div data-estimates></div>" : ""}
    ${moduleId === "owner-approvals-review-queue" ? "<div data-owner-approvals></div>" : ""}
    ${moduleId === "job-documents-evidence-binder" ? "<div data-documents></div>" : ""}
    ${moduleId === "bug-capture-qa-issue-log" ? "<div data-bug-capture></div>" : ""}
  `;

  detailDemo
    .querySelector("[data-demo-form]")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const nextItem = Object.fromEntries(
        demoModule.fields.map((field) => [
          field.name,
          String(formData.get(field.name) ?? "").trim(),
        ]),
      );

      demoData[demoModule.storageKey] = [
        nextItem,
        ...(demoData[demoModule.storageKey] ?? []),
      ];
      if (moduleId === "projects") {
        saveSelectedProject(nextItem.name);
      }
      saveDemoData();
      addRecentActivity(moduleId, nextItem);
      event.currentTarget.reset();
      renderModules();
      renderDemoModule(moduleId);
    });

  detailDemo
    .querySelector("[data-reset-demo]")
    .addEventListener("click", resetAllDemoData);
  renderDemoList(moduleId);
}

const openModuleDetail = (module) => {
  const moduleId = getModuleId(module.name);

  activeModule = module;
  detailTitle.textContent = module.name;
  detailDescription.textContent = module.description;
  detailPanel.hidden = false;
  setActiveModuleCard(moduleId);
  renderDemoModule(moduleId);
  saveLastOpenedModule(moduleId);
};

const closeModuleDetail = () => {
  activeModule = null;
  detailPanel.hidden = true;
  cardGrid.querySelectorAll(".brain-card").forEach((card) => {
    card.classList.remove("active");
  });
};

const renderModules = () => {
  renderDashboardSummary();
  renderAiInsights();

  const fragment = document.createDocumentFragment();

  modules.forEach((module, index) => {
    const moduleId = getModuleId(module.name);
    const demoCount = getDemoCount(moduleId);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "brain-card";
    card.dataset.moduleId = moduleId;
    card.setAttribute("aria-label", `Open ${module.name} module`);
    card.innerHTML = `
      <span class="card-icon">${String(index + 1).padStart(2, "0")}</span>
      <span class="card-title">${module.name}</span>
      <span class="card-copy">${module.description}</span>
      ${demoCount ? `<span class="card-count">${demoCount} demo saved</span>` : ""}
    `;
    card.addEventListener("click", () => openModuleDetail(module));
    fragment.appendChild(card);
  });

  cardGrid.replaceChildren(fragment);

  if (activeModule) {
    setActiveModuleCard(getModuleId(activeModule.name));
  }
};

function resetAllDemoData() {
  demoData = cloneDemoDefaults();
  saveDemoData();
  refreshDemoViews();
  setBackupStatus("Demo data reset to starter defaults.");
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

detailClose.addEventListener("click", closeModuleDetail);
exportDemoData.addEventListener("click", exportDemoDataAsJson);
importDemoData.addEventListener("click", importDemoDataFromJson);
backupResetDemoData.addEventListener("click", resetAllDemoData);
resetDemoData.addEventListener("click", resetAllDemoData);
clearActivity.addEventListener("click", clearRecentActivity);
refreshInsights.addEventListener("click", refreshAiInsights);

window.addEventListener("storage", (event) => {
  if (event.key === DEMO_DATA_KEY) {
    demoData = loadDemoData();
    refreshDemoViews();
    setBackupStatus("Demo data updated in another tab.");
  }

  if (event.key === ACCOUNTING_REVIEW_KEY) {
    accountingReview = loadAccountingReview();
    if (activeModule && getModuleId(activeModule.name) === "accounting-review") {
      renderDemoModule("accounting-review");
    }
  }

  if (event.key === INVESTOR_VISIBILITY_KEY) {
    investorVisibility = loadInvestorVisibility();
    if (
      activeModule &&
      getModuleId(activeModule.name) === "aquabona-investor-portal"
    ) {
      renderDemoModule("aquabona-investor-portal");
    }
  }

  if (event.key === RECENT_ACTIVITY_KEY) {
    recentActivity = loadRecentActivity();
    renderRecentActivity();
  }
});

renderRecentActivity();
renderModules();

const lastOpenedModule = modules.find(
  (module) => getModuleId(module.name) === getLastOpenedModule(),
);

if (lastOpenedModule) {
  openModuleDetail(lastOpenedModule);
}
