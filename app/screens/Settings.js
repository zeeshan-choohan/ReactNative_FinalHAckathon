import React, { useState } from 'react';
import { List, Card, Text } from 'react-native-paper';

const About = () => (
  <Card>
    <Card.Content>
    <Text variant="titleLarge">Chairman Message</Text>
      <Text variant="bodyMedium">
        The purpose of sending this message to you is so that you not only spread this message to others
        but also play your part in helping us to continue serving and helping the needy till the Day of 
        Judgement </Text>
    </Card.Content>
  </Card>
);

const TermsAndCondition = () => (
  <Card>
    <Card.Content>
      <Text variant="bodyMedium">Recurring donations are auto-charged repeatedly on periodically basis.
       Once subscribed, donations will be charged automatically from your card/account at the selected 
       intervals. For example, if you choose the Monthly Recurring option, the first payment will be
        charged right away and the next payment will be automatically charged after one month from the 
        card/account.</Text>
    </Card.Content>
  </Card>
);

const PrivacyPolicy = () => (
  <Card>
    <Card.Content>
      <Text variant="bodyMedium">Saylani Welfare Trust is a name that needs no introduction today. 
      The journey this team embarked upon was made possible owing to their zeal, enthusiasm & 
      commitment to the society and by the grace of Allah (SWT), it has become a name that we need 
      and not just the one we want. I wish Saylani’s team all the success and blessing that they
       deserve for future, May God bless Saylani and ensure prosperity and happiness for our people,
        Ameen!</Text>
    </Card.Content>
  </Card>
);

const Settings = () => {
  const [termsExpanded, setTermsExpanded] = useState(false);
  const [privacyExpanded, setPrivacyExpanded] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);

  const handleTermsPress = () => setTermsExpanded(!termsExpanded);
  const handlePrivacyPress = () => setPrivacyExpanded(!privacyExpanded);
  const handleAboutPress = () => setAboutExpanded(!aboutExpanded);

  return (  
    <>
      <List.Accordion
        title="Terms and Conditions"
        left={props => <List.Icon {...props} color='#7DCEA0' icon="archive-alert-outline" />}
        expanded={termsExpanded}
        onPress={handleTermsPress}
        titleStyle={{ color: '#7DCEA0' }}>
      </List.Accordion>

      {termsExpanded && <TermsAndCondition />}

      <List.Accordion
        title="Privacy Policy"
        left={props => <List.Icon {...props} color='#7DCEA0' icon="archive-lock" />}
        expanded={privacyExpanded}
        onPress={handlePrivacyPress}
        titleStyle={{ color: '#7DCEA0' }}>
      </List.Accordion>

      {privacyExpanded && <PrivacyPolicy />}

      <List.Accordion
        title="About"
        left={props => <List.Icon {...props} color='#7DCEA0' icon="information" />}
        expanded={aboutExpanded}
        onPress={handleAboutPress}
        titleStyle={{ color: '#7DCEA0' }}>
      </List.Accordion>

      {aboutExpanded && <About />}
    </>
  );
};

export default Settings;
