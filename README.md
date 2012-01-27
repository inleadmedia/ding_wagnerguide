#Module for integrating WagnerGUIDE with a ding site

It inserts some JavaScript that looks for the `ting-availability`-container,
then finds the ALMA id / item number XXX from `<div id="ting-item-XXX">`.

It then waits for `ting-availability` to be populated with the holding lines,
and prepends the lines with a link to WagnerGUIDE.
