
// one way to export all shared modules is to create a const

import { PagerPartialComponent } from "../components/common/pager.partial";
import { StarsPartialComponent } from "../components/common/star.partial";

// then import it in the modules you intend to use
export const SHARED_COMPONENTS = [
  // add common standalone components
  StarsPartialComponent,
  PagerPartialComponent
] as const;
