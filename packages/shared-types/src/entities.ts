import { Role, TaskType, TaskStatus, Priority, PhotoType } from './enums';

// User Entity
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: Role;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Property Entity
export interface Property {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  city: string;
  country: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  photos: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Task Entity
export interface Task {
  id: string;
  propertyId: string;
  assignedToId?: string;
  type: TaskType;
  status: TaskStatus;
  title: string;
  description?: string;
  scheduledAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  estimatedDuration?: number; // in minutes
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}

// Task Photo
export interface TaskPhoto {
  id: string;
  taskId: string;
  url: string;
  type: PhotoType;
  createdAt: Date;
}

// GPS Coordinates
export interface Coordinates {
  latitude: number;
  longitude: number;
}
