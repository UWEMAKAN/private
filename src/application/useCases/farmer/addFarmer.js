import Farmer from '../../../entities/farmer/farmer';

const addUser = (FarmerRepository, EmailService) => {
  async function Execute(data) {
    if (
      !data.firstName || !data.lastName || !data.emailAddress
      || !data.phoneNumber || !data.stateOfOrigin || !data.nationality
      || !data.address || !data.photo || !data.location
      || !data.businessName || !data.businessAddress
    ) {
      throw new Error('validation failed');
    }

    const farmer = await FarmerRepository.getByEmail(data.emailAddress);
    if (farmer) {
      throw new Error('email already exists');
    }

    let newFarmer = new Farmer(data);
    newFarmer = await FarmerRepository.add(newFarmer);
    await EmailService.notify(newFarmer);

    return newFarmer;
  }

  return {
    Execute
  };
};

export default addUser;
