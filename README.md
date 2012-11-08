#Module for integrating WagnerGUIDE with a ding site

It inserts some JavaScript that looks for the `ting-availability`-container,
then finds the ALMA id / item number XXX from `<div id="ting-item-XXX">`.

It then waits for `ting-availability` to be populated with the holding lines,
and prepends the lines with a link to WagnerGUIDE.

The module is compatible with DDELibra systems only, and communicates through ALMA.

##Configuration

Settings are found under Administration > Settings > Ding! > WagnerGUIDE module settings (/admin/settings/ding/wagnerguide).

Holding data for materials contains information on:

* branches (typically represent separate locations where patrons can borrow materials. Ex. "Vej" signifying "Vejle Library")
* departments (logical divisions of a branch, typically rooms within the building. Ex. "Mus" signifying the Music department)
* locations (separate placement categories of materials. Ex. "depot", "magasin", "udlån" )
* sublocations (smaller, specific placement categories, typically used for genres or special types of materials. Ex. "krimi" (genre), "DVD" (material), "large" (especially large materials) )

###Base URL for branches (required):
Insert one line pr. branch the library has. Materials from omitted branches will not get WagnerGUIDE links generated for them.

The syntax is instances of "BRANCH":"URL", comma-separated and represented as a JSON array. Full example: 
    
    {
      "Vej":"http://web.wagnerguide.com/vejleLibrary.aspx",
      "Bor":"http://web.wagnerguide.com/BorkopLibrary.aspx",
      "Egt":"http://web.wagnerguide.com/EgtvedLibrary.aspx",
      "Giv":"http://web.wagnerguide.com/GiveLibrary.aspx",
      "Jel":"http://web.wagnerguide.com/JellingLibrary.aspx"
    }

###Translation array for branch 'X':
A translation array is to be configured for each branch. This array (in JSON format) contains any exceptions to the generation of links to WagnerGUIDE. The following template contains all types of holding data:  

    {
      "department_id":{},
      "location_id":{},
      "sublocation_id":{}
    } 

The following exceptions are available and can be inserted into the above template:

**{empty array}**: Used for materials that we do not want a WagnerGUIDE link generated for. Simply include an empty array for the needed holdings. Ex. if you want no links for materials that have location_id = office, write:

    "location_id":{
      "office":{}
    }
    
**popup**: Used for displaying a popup with an informative text INSTEAD of a link. Some materials are not accessible to the public, so if you want to inform patrons that they should contact the staff to obtain materials hidden away in the depot, write  

    "location_id":{
      "depot":{
        "popup":"This material is in depot - please contact the staff so they can retrieve it for you"
      }
    }

**new_label**: It can be useful to rewrite the holding data before building the link to WagnerGUIDE. If for example "magasin", "magasin1" and "magasin2" alle should written in the link as "magasin", write:

    "location_id":{
      "magasin1":{
        "new_label":"magasin"
      },
      "magasin2":{
        "new_label":"magasin"
      }
    }

**ignore_mtype**: For exceptions to rules, it is possible to have certain material types ignoring the rule. If for example everything with holding "depot" is not directly available to patron EXCEPT in the case of CDs in depot, add ignore_mtype to the rule. The following will result in every depot material getting a popup, except CDs in depot, which will get the link as per the normal function of this module:

    "depot":{
        "ignore_mtype":"cd",
        "popup":"This material is in depot - please contact the staff so they can retrieve it for you"
    }

The following is a full example of a Translation array for a branch:

    {
      "department_id":{},
      "location_id":{
        "bus":{
          "popup":"Materialet er i BUSSEN - og kan findes frem til dig næste gang bussen er hjemme. Spørg personalet"
        },
        "dagpleje":{},
        "depot":{
          "popup":"Materialet er i DEPOT - du kan få personalet på Vejle Bibliotek til at hente det til dig"
        },
        "kontor":{},
        "magasin":{
          "popup":"Materialet er i MAGASIN - du kan få personalet på Vejle Bibliotek til at hente det til dig"
        },
        "magasin1":{
          "ignore_mtype":"cd",
          "popup":"Materialet er i MAGASIN - du kan få personalet på Vejle Bibliotek til at hente det til dig"
        },
        "magasin2":{
          "popup":"Materialet er i MAGASIN - du kan få personalet på Vejle Bibliotek til at hente det til dig"
        },
        "magasin3":{
          "popup":"Materialet er i MAGASIN - du kan få personalet på Vejle Bibliotek til at hente det til dig"
        }
      },
      "sublocation_id":{}
    }

