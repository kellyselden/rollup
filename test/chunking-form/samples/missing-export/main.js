import t1d1f1, { t1d1f2 } from './t1d1';

t1d1f1();
t1d1f2();

import t1d2f1, { t1d2f2 } from './t1d2';

t1d2f1();
t1d2f2();

export { default, default as t2d1f1, t2d1f2 } from './t2d1';

import t3d1f1, * as t3d1 from './t3d1';

t3d1f1();
t3d1.f2();

import t3d2f1, * as t3d2 from './t3d2';

t3d2f1();
t3d2.f2();