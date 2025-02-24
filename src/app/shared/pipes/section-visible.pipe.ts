import { Pipe, PipeTransform } from '@angular/core';
import { SelectableSection } from '@app/models/cv.model';

@Pipe({
  name: 'sectionVisible',
  standalone: true,
})
export class SectionVisiblePipe implements PipeTransform {
  transform(
    selectedSection: SelectableSection,
    sectionName: SelectableSection
  ): boolean {
    return selectedSection === 'all' || selectedSection === sectionName;
  }
}
