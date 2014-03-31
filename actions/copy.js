 /**
 * Implements ToonTalk's action of a robot copying something
 * Authors: Ken Kahn
 * License: New BSD
 */
 
 /*jslint browser: true, devel: true, plusplus: true, vars: true, white: true */

window.TOONTALK.copy = 
(function (TT) {
    "use strict";
    return {
        create: function (path) {
            var result = Object.create(this);
            if (!path) {
                console.log("path undefined in copy action");
            }
            result.path = path;
            return result;
        },
        
        run: function (context, robot) {
            var referenced = TT.path.dereference_path(this.path, context);
            if (!referenced) {
                return false;
            }
            robot.get_body().add_newly_created_widget(referenced.copy(true));
            return true;
        },
        
        toString: function () {
            return "copy " + TT.path.toString(this.path);
        },
        
        get_json: function () {
            return {type: "copy_action",
                    path: this.path.get_json()
                    };
        },
        
        create_from_json: function (json) {
            return TT.copy.create(TT.UTILITIES.create_from_json(json.path));
        }

    };
}(window.TOONTALK));