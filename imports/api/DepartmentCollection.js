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
      newDepartment.counter = 0;
      newDepartment.active = true;
      newDepartment.staff = [];
      return DepartmentCollection.insert(newDepartment);
    },
    "department.addStaff": function(deptId, staffId) {
      return DepartmentCollection.update(
        { _id: deptId },
        {
          $inc: { counter: 1 },
          $push: { staff: staffId }
        }
      );
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
