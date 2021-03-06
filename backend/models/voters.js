'use strict';
module.exports = (sequelize, DataTypes) => {
  const Voter = sequelize.define('Voter', {
    matric: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    otherName: DataTypes.STRING,
    faculty: DataTypes.STRING,
    department: DataTypes.STRING,
    hall: DataTypes.STRING,
    voterCode: DataTypes.STRING,
    accreditedAt: DataTypes.DATE,
    level: DataTypes.ENUM(100,200,300,400,500,600),
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        let lastname = this.lastName.split('-');
        let firstname = this.firstName.split('-');
        lastname.forEach((name,index) => {
          lastname.splice(index,1,name[0].toUpperCase() + name.slice(1).toLowerCase())
        })
        firstname.forEach((name,index) => {
          firstname.splice(index,1,name[0].toUpperCase() + name.slice(1).toLowerCase())
        })
        lastname = lastname.join('-');
        firstname = firstname.join('-')

        return `${firstname} ${lastname}`
      }
    },
    prospectiveMail: {
      type: DataTypes.VIRTUAL,
      get() {
        let lastname = this.lastName.toLowerCase()
        let firstname = this.firstName.toLowerCase()
        let matric = this.matric

        let firstWord = firstname[0];
        let lastThree = matric.toString().slice(3)

        let prospectiveMail = `${firstWord}${lastname}${lastThree}@stu.ui.edu.ng`

        return prospectiveMail;
      }
    }
  }, {});
  Voter.associate = function(models) {
    Voter.hasMany(models.Vote, {
      foreignKey: 'voterId',
      onDelete: 'CASCADE'
  })
    // associations can be defined here
  };
  return Voter;
};