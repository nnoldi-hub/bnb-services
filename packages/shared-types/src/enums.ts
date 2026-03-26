// User Roles
export enum Role {
  OWNER = 'OWNER',
  TEAM_MEMBER = 'TEAM_MEMBER',
  ADMIN = 'ADMIN',
}

// Task Types
export enum TaskType {
  CLEANING = 'CLEANING',
  EMERGENCY = 'EMERGENCY',
  MAINTENANCE = 'MAINTENANCE',
  INSPECTION = 'INSPECTION',
}

// Task Status
export enum TaskStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// Priority Levels
export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

// Photo Types
export enum PhotoType {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
  DURING = 'DURING',
  ISSUE = 'ISSUE',
}

// Payment Types
export enum PaymentType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  PER_TASK = 'PER_TASK',
  ONE_TIME = 'ONE_TIME',
}

// Payment Status
export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

// Notification Types
export enum NotificationType {
  TASK_ASSIGNED = 'TASK_ASSIGNED',
  TASK_COMPLETED = 'TASK_COMPLETED',
  TASK_OVERDUE = 'TASK_OVERDUE',
  PAYMENT_DUE = 'PAYMENT_DUE',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  EMERGENCY_ALERT = 'EMERGENCY_ALERT',
}
