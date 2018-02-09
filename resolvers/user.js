import bcrypt from 'bcrypt';
import _ from 'lodash';

const formatErrors = (e, models) => {
    if(e instanceof models.sequelize.ValidationError) {
        return e.errors.map(x => _.pick(x, ['path','message']));
    }
    return [{ path: 'name', message: 'something went wrong' }];
}

export default {
    Query: {
        getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id }}),
        allUsers: (parent, args, { models }) => models.User.findAll(),
    },
    Mutation: {
        register: async (parent, { password, ...otherArgs}, { models }) => {
            try {
                if(password.length < 5 || password.length > 100) {
                    return {
                        ok: false,
                        error: [{ path: 'password', message: 'The password needs to be greater that 5'}]
                    }
                }

                const hashedPassword = await bcrypt.hash(password, 12);
                const user = await models.User.create({ ...otherArgs, password: hashedPassword });
                
                return {
                    ok: true,
                    user,
                };
            } catch (err) {
                return {
                    ok: false,
                    error: formatErrors(err, models),
                };
            }
        },
    },
};