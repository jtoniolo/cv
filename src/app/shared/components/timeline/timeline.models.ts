import { Project } from '../../../models/cv.model';

/**
 * Represents a single item in a timeline
 */
export interface TimelineItem {
  /** Start date of the timeline item */
  startDate: string;
  /** End date of the timeline item (optional for current positions) */
  endDate?: string;
  /** Title of the timeline item */
  title: string;
  /** Subtitle or secondary information */
  subtitle?: string;
  /** Main content/description of the timeline item */
  content: string;
  /** Tags or keywords associated with the item */
  tags?: string[];
  /** Additional metadata including projects */
  metadata?: {
    projects?: Project[];
    [key: string]: unknown;
  };
}

/**
 * Configuration options for the timeline component
 */
export interface TimelineConfig {
  /** Whether to show tags on timeline items */
  showTags?: boolean;
  /** Whether to allow filtering by tags */
  enableFiltering?: boolean;
  /** Custom CSS class for timeline items */
  itemClass?: string;
  /** Whether to show the timeline line */
  showLine?: boolean;
  /** Whether to animate items on scroll */
  animate?: boolean;
}
