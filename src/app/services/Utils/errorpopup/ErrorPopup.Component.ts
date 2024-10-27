import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-popup',
  imports: [CommonModule],
  template: `
    <div class="modal" tabindex="-1" role="dialog" *ngIf="isVisible">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Error</h5>
            <button type="button" class="close" (click)="close()">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ errorMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="close()">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      display: block;
      position: fixed;
      z-index: 1050;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.5);
    }
  `],
    standalone:true
})
export class ErrorPopupComponent {
  @Input() errorMessage = '';
  isVisible = false;

  open(message: string) {
    this.errorMessage = message;
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
