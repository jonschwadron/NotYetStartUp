var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  timestamps = require('mongoose-timestamp'),
  Definitions = require('../model-definitions');


var ProjectSchema = new Schema({
  requestor: Definitions.string(100, true),
  requestorName: Definitions.string(100, false),
  requestorRole: Definitions.string(100, true),
  roleNeeded: Definitions.string(100, true),
  description: Definitions.string(1000, false),
  assignee: Definitions.string(100, false),
  contact: Definitions.string(100, true),
  status: Definitions.string(100, false),
  userId: Definitions.string(100, false)
});

ProjectSchema.virtual('id').get(function() {
  return this._id;
});

ProjectSchema.set('toJSON', {
  virtuals: true
});

ProjectSchema.plugin(timestamps);
module.exports = mongoose.model('Project', ProjectSchema);
