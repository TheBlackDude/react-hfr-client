### FacilityDiff -- design document

This document aims at describing the design of a facilities comparison
tool, currently named _FacilityDiff_. The tool was conceived by the
team of the Health Facility Registry in Sierra Leone, while wrapping
up the work done on the client rewrite in Summer and Autumn 2017.

One of the most challenging requirements for the rewritten app was
data integration between our registry and DHIS2 data. This required
automation but also an user interface to manually handle
inconsistencies. A prototypical but working service was built and the
team found out that it could be applied to other countries and data
sources.

Even though the constraints of the project for Sierra Leone did not
allow us to build the generalised comparison tool, we ended up
agreeing on its structure and this document aims to describe the
vision in case further resources will become available later on.

#### In any country, locations form a tree

As simple as it sounds, this needed some reasoning at the
beginning. In order to compare facilities we want to know where they
are, and when coordinates are not available this means comparing their
parents. It took us a few iterations in order to come up with an
interface that can be applied to the whole tree of locations referred
by the facilities.

#### Do one thing and do it well

Comparing facilities is different from storing them. We find that the
value added by the comparison service can couple well with existing
registry solutions, like DHIS2 facility data, the OpenHIE registry, or
lists of facilities provided by the GIS department within eHealth
itself. _FacilityDiff_ could become a standalone service where users
could configure data sources to compare and synchronise.

#### From this repo to _FacilityDiff_

Here is a sample roadmap, a list of tasks needed to turn this repo
into the standalone _FacilityDiff_ service.

- fork the backend and remove the unrelated parts
- compare with another external source rather than with the internal registry
- enable configuration of data sources and other country-specific options

The idea is to remove the concern of the facility registry from the
tool, in order to make it work nicely with external registries.

#### Modular development for modular value

We identified two ways to add value to _FacilityDiff_ in a modular and
gradual way, depending on the needs our clients might have. The two
main dimensions of development would be:

- comparison features
- communication modules

Comparison features are interfaces, algorithms, and all the resources
we can collect related to the task of comparing facilities. For
example we now are comparing the names, but we could improve the
comparison taking into account the coordinates.

Communication modules means connectors enabling _FacilityDiff_ to read
or write data from or to different data sources. The idea is that we
can develop such connectors when that is valuable for an usage
scenario, keeping development closely connected to the user value. For
example we can now read from DHIS2, but we could add a module to write
to DHIS2, or read from OpenHIE, or write to OpenHIE, or read from a
geo server, etcetera.

Note that the two development dimensions are orthogonal, so the
development can happen in parallel, while the value increases
exponentially. If for example we add a comparison feature, that can
potentially apply to all data sources supported by our communication
modules, and vice versa.
