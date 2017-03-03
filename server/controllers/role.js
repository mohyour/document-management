import model from '../models';

const Role = model.Role;

export default {

  /**
   * createRoles - Creates a role
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Response Object
   */
  createRole(req, res) {
    return Role
      .create(req.body)
      .then(role => res.status(201).send(role))
      .catch((error) => {
        res.status(400).send({
          message: error.message,
        });
      });
  },

  /**
   * listRoles - List roles
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Response Object
   */
  listRoles(req, res) {
    const limit = req.query.limit;
    const offset = req.query.offset;
    return Role
    .findAndCountAll({
      limit: limit || null,
      offset: offset || null,
      order: '"createdAt" DESC'
    })
    .then((roles) => {
      const metadata = limit && offset ? { count: roles.count,
        pages: Math.ceil(roles.count / limit),
        currentPage: Math.floor(offset / limit) + 1 } : null;
      res.status(200).send({ roles: roles.rows, metadata });
    });
  },

  /**
   * getRole - Get a role
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Response Object
   */
  getRole(req, res) {
    return Role
    .findById(req.params.id)
    .then(role => {
      if (!role) {
        return res.status(404).send({
          message: 'Role Not Found'
        });
      }
      res.status(200).send(role);
    });
  },

  /**
   * updateRole - Update a role
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Response Object
   */
  updateRole(req, res) {
    return Role
    .findById(req.params.id, {})
    .then(role => {
      if (!role) {
        return res.status(404).send({
          message: 'Role Not Found',
        });
      }
      return role
        .update(req.body)
        .then(() => {
          res.status(200).send(role);
        });
    });
  },

  /**
   * deleteRole - delete a role
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Response Object
   */
  deleteRole(req, res) {
    return Role
      .findById(req.params.id)
      .then(role => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return role
          .destroy()
          .then(() => res.status(200).send({
            message: 'Role Deleted'
          }));
      });
  },
};
