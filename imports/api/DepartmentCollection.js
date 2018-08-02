import { Mongo } from "meteor/mongo";

export const DepartmentCollection = new Mongo.Collection(
  "DepartmentCollection"
);

if (Meteor.isServer) {
  Meteor.publish("DepartmentCollection", function() {
    return DepartmentCollection.find();
  });

  DepartmentCollection.allow({
    insert: () => {
      return false;
    },
    update: () => {
      return false;
    },
    remove: () => {
      return false;
    }
  });

  DepartmentCollection.deny({
    insert: () => {
      return true;
    },
    update: () => {
      return true;
    },
    remove: () => {
      return true;
    }
  });

  Meteor.methods({
    "department.insert": function(newDepartment) {
      newDepartment.createdAt = new Date();
      newDepartment.createdBy = Meteor.userId();
      newDepartment.active = true;
      return DepartmentCollection.insert(newDepartment);
    },
    "department.delete": function(departmentId) {
      return DepartmentCollection.update(
        { _id: staffId },
        {
          $set: {
            active: false
          }
        }
      );
    }
  });
}
