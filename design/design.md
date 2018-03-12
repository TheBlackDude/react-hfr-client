This is the first software design document for the Health Facility App
project, created mainly with information coming from the
[specification][spec] and communications via mail, chats and
meetings. The document contains a part about the open questions and a
part about the known structure. The idea is to empty the "open
questions" part and turn it into known structure, and then the
document will be complete.

This documents uses terms defined in [the glossary](glossary.md)

Visual design are contained in [this shared
directory](https://drive.google.com/open?id=0Bynr9ODRlOYMMDBRZ0U4ZjJVQjQ)

### Known structure

This document aims to describe the final desired structure of a system
that integrates the Health Facility Registry in Sierra Leone with
DHIS2. The milestones and roadmap depend on this document in order to
be defined, but they might be written elsewhere.

In order to bridge between application [specification][spec] and the
design of the single components, here the parts of the system are
presented together with the corresponding features that motivate their
existence.

#### The current app will be ported to React

This is the direction DHIS2 and eHealth is taking, see
[HFR-233](https://jira.ehealthafrica.org/browse/HFR-233)

#### Deployment

According to [the
docs](https://docs.dhis2.org/master/en/developer/html/apps.html), a
DHIS2 app is an Open Web App that can be installed from an archive, so
we will have a build process and a web page listing the built archives
by version. The web page could even be the Github releases page, if
the repo will be open sourced.

The build process will happen on a build machine.

We want to keep track of the person who triggered the building of
every version.

#### Two ways to present the application

The required feature here is to be able to access the registry from
within and from outside DHIS2.

This means that the users will face two web interfaces. According to
the specs the two interfaces will be identical but one of them will be
contained in the DHIS2 interface.

Rather than embedding the standalone interface in the DHIS2 interface,
we will have to hide DHIS2 interface elements when the frontend is
running in standalone mode.

This applies for example to the DHIS2 toolbar. We want to show it if
the user is running the app as a DHIS2 app, while we want to hide it
when the app is served standalone.

#### Authentication

The registry acts as an OAuth client, asking for user credentials from
DHIS2. Support for OAuth in DHIS2 is described
[here](https://docs.dhis2.org/master/en/developer/html/webapi_authentication.html#webapi_oauth2).

The user permissions are defined and managed within the registry. This
means that DHIS2 users that have never used the registry before will
go through the following steps:

- be asked for authentication through the OAuth flow (Registry ->
  DHIS2 -> Registry)
- ask an admin to give them the required permissions

Since the requirement is for the registry to work also as a standalone
app, we support standard Django authentication, without requiring the
users to have a DHIS2 account.

We might need to hide some of the DHIS2 interface components when an
user is not authenticated via DHIS2.

#### Editing functionality

Some users will be able to edit health facility data. These edits have
to [be propagated](#change-propagation) to all the related systems.

#### Data integration

According to information we collected mainly from Jasper, it's
unlikely that we will be able to write data to DHIS2. In this context,
we will receive data about facilities and locations from DHIS2 and
allow the user to update what is in the registry.

#### Source of truth

This tool helps comparing different versions of the same data tree. In
the future we could expand the supported data sources, but at the
moment we have:

- the registry data
- the DHIS2 data
- the GIS data

Versions coming from external data sources are ephemeral. For example
DHIS2 and GIS data can change every time we query the related
services. The registry data is persistent, and it constitutes our
source of truth. Every change to it is persisted and possibly
propagated. The registry codes are used for navigating comparisons up
and down the locations tree. We do not provide navigation on
comparisons based on all the possible versions, as it would be
confusing.

In order to align registry data with other versions like DHIS2, the
registry will copy the DHIS2 tree locally, show the differences to the
user, and enable the user to create changes that will eliminate the
differences.

#### Change propagation

Changes coming from the users to the health facility data have to be
propagated to all parts of the system, whether they are produced by
[editing](#editing-functionality) or by [approving data coming from
DHIS2](#data-integration).

There will be a role for users that are expected to edit health
facility data or to approve data changes coming from DHIS2.

There will be a flow of changes going unidirectionally from the
registry database to the other components that are under control of
the registry. This could include the Kobo Toolbox, but streamlining
the process up to that level might be very expensive. As far as we
know, the data flow from data collection to health facility registry
is rather complex and it involves manual work.

#### Authorisation

The spec mentions three user roles

- read role: grants access to all app
- write role: grants permission to edit health facilities
- sync role: allows to approve synchronisation changes

The write role is called admin in the specs. The sync role is called
superadmin. The sync role is supposed to approve all changes. There
should be a checkbox on edit pages that enable direct synchronisation
if the user has the sync role.

Besides the roles above, we will have to distinguish users by:

- whether they are using the app through DHIS2 or as a standalone
- whether they are authorised through DHIS2 or not

### Open questions

#### Where is the users' specification?

This software design document is based upon the app
[specification][spec], but the specification includes requirements
like porting to React, which do not refer directly to value added for
the stakeholders. We are in the process to retrieve the original
proposal or external specification for the project, in order to ground
our design on the actual requirements.

#### How about changes in the GIS database?

The GIS department maintains its own database with information about
health facilities. This is yet another version different from the
registry and from DHIS2. The specs don't clarify how to handle changes
on that side. Two possibilities would be:

- include changes and have them going through the approval process, as
  changes from DHIS2 do
- ignore the database, and ask users to update the health facilities
  using the editing functionality

#### Can we actually integrate data on the whole pipeline?

[on Jira](https://jira.ehealthafrica.org/browse/HFR-231)

Can we actually update all the parts of the registry data pipeline to
integrate with DHIS2 data? Answering this question might need research
and to develop a throwaway prototype.

#### Can we use OpenHIE?

About this the specs are already technical enough

#### Can we use Gather 2?

[on Jira](https://jira.ehealthafrica.org/browse/HFR-236)

About this the specs are already technical enough

#### Will the repo be open sourced?

If it will not, where will we publish the versions of the app?

#### Do we want to abstract the country?

[on Jira](https://jira.ehealthafrica.org/browse/HFR-245)

This is not in the specification, but it has been mentioned during
several meetings. There was the idea to abstract some software from
the registry, in order to turn it into a configurable product which
could be reused in other countries like Liberia. It's now clear that
this is going to be more expensive, so we are waiting from answers
from the management about this requirement


[spec]: https://docs.google.com/document/d/1kRQnJNXcfwBnsuuBuztdJN8P11jIpKeOP45GJg_TlrM/edit "Application Specification from Samuel"
