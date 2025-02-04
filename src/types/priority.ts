export interface PriorityTask {
  name: string;
  duration: string;
}

export interface EnhancedPriorityTask extends PriorityTask {
  isInProgress?: boolean;
  remainingTime?: string;
}
