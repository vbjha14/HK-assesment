import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from "@angular/core";
import { SpinnerOverlayComponent } from './spinner-overlay.component';

@Injectable({
  providedIn: "root"
})
export class LoaderService {

  private overlayRef: OverlayRef = null;
  private httpInstance : number =0;
  constructor(private overlay: Overlay) {}

  public show(message = '') {
    // Returns an OverlayRef (which is a PortalHost)
    this.httpInstance = this.httpInstance + 1;
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    if(!this.overlayRef.hasAttached()){
        // Create ComponentPortal that can be attached to a PortalHost
        const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);
        const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    }
  }

  public hide() {
    this.httpInstance = this.httpInstance - 1;
    if (!!this.overlayRef && this.httpInstance === 0) {
      this.overlayRef.detach();
    }
  }
}

//https://christianlydemann.com/four-ways-to-create-loading-spinners-in-an-angular-app/
