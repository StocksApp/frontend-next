import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';
import SidebarLayout from '../../components/layouts/SidebarLayout';
import PredictionChart from '../../components/molecules/PredictionChart';
import TickerChart from '../../components/molecules/TickerChart';

const Analysis = () => {
  // const onClick = async () => {
  //   const ts = Array(24)
  //     .fill(0)
  //     .map((_, i) => i + Math.random() / 5);
  //   const res = await fetch('/api/arima', {
  //     body: JSON.stringify({ inputData: ts }),
  //     method: 'POST',
  //   });
  //   const preds = await res.json();
  //   console.log(preds);
  // };
  // const [selectedTab, setSelectedTab] = useState<number | null>(null);

  return (
    <SidebarLayout>
      <Tabs
        colorScheme="cyan"
        isFitted
        border="1px solid"
        borderColor="gray.200"
        p={2}
        borderRadius="md"
        isLazy
        lazyBehavior="unmount"
        // onChange={(index) => setSelectedTab(index)}
      >
        <TabList>
          <Tab whiteSpace="nowrap">Notowania historyczne</Tab>
          <Tab whiteSpace="nowrap">Predykcja ARIMA</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TickerChart />
          </TabPanel>
          <TabPanel>
            <PredictionChart />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </SidebarLayout>
  );
};

Analysis.auth = true;

export default Analysis;
