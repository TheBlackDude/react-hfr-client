### Closed questions

#### How can we authorise through DHIS2?

[on Jira](https://jira.ehealthafrica.org/browse/HFR-248)

How will users be authenticated by the DHIS2 app? This is something
which needs to be clarified early because some changes made to improve
usability of the authentication could have deep impact and an high
costs.

The specs state that the users should authenticate automatically
through their DHIS2 account, but we need to define how to do that.

#### Which backend components we will need for the app?

[on Jira](https://jira.ehealthafrica.org/browse/HFR-234)

In order for a DHIS2 app to be installed, we might need some minimal
backend, or maybe no backend at all, or maybe just a web server where
to put the assets in order for DHIS2 instances to download them. Note
that we will need to versioning and deployment for any service we will
put in prod.

#### Can we include the app in the DHIS2 frame without any changes?

[on Jira](https://jira.ehealthafrica.org/browse/HFR-233)

This is more a question about usability. We also need to consider
shortly whether this could present problems from the point of view of
layout rules in the style sheets.

Depending on the extent of the required changes we might choose
different strategies for reusability. A possibility could be to have a
runtime flag, another possibility could be to have two frontends
sharing big components.

#### Will the rewrite to React happen in any case?

[on Jira](https://jira.ehealthafrica.org/browse/HFR-233)

Do we want to rewrite in React only in the case the frontend needs to
be rewritten, or do we want to rewrite it in any case?

#### Will DHIS2 be the source of truth, or will inconsistencies stay?

[on Jira](https://jira.ehealthafrica.org/browse/HFR-238)

We cannot change DHIS2 data, so we can just prompt the users with
differences between the registry and DHIS2. There are different ways
to do that. Let's consider the case of an health facility that is
removed from DHIS2.

One approach is to consider DHIS2 as the source of truth. In this
case, the users cannot ignore the change, they have to approve it. In
this case, it's not clear how to handle changes coming from the GIS
database or from the health facility editing interface. Those changes
would create some inconsistencies with the source of truth.

The other approach is to allow inconsistencies to stay. In this case,
the users can decide that the health facility registry has better
information, and not to remove the health facility. The system has to
keep track of this, so we will need an interface to show
inconsistencies that have been ignored. Enabling this might create
complexity in the business logic, as some changes by depend on others
that are pending. For example an health facility could be added and
then renamed.
