import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  const { address, contract, getCampaigns, searchString } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setFilteredCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchString) {
      const filtered = campaigns.filter((obj) =>
        Object.values(obj).some((val) =>
          val.toString().toLowerCase().includes(searchString.toLowerCase())
        )
      );

      setFilteredCampaigns(filtered);
    } else {
      setFilteredCampaigns(campaigns);
    }
  }, [searchString]);

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={filteredCampaigns}
    />
  );
};

export default Home;
