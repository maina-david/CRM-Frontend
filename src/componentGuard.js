export default {
  accessRightMaster(data) {
    const localStorageData = JSON.parse(
      localStorage.getItem("access_rights_formatted")
    );
    return localStorageData.includes(data);
  },
};
