import React from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

export default function FirstAidGuide() {
  const firstAidTopics = [
    {
      title: 'Cuts and Scrapes',
      content: (
        <List dense>
          <ListItem><ListItemText primary="1. **Stop the Bleeding:** Apply direct pressure with a clean cloth or sterile bandage for several minutes until bleeding stops. Elevate the injured part if possible." /></ListItem>
          <ListItem><ListItemText primary="2. **Clean the Wound:** Gently wash with mild soap and plenty of clean, running water. Avoid harsh soaps, hydrogen peroxide, or iodine, which can damage tissue." /></ListItem>
          <ListItem><ListItemText primary="3. **Remove Debris:** Use sterilized tweezers to remove any dirt, glass, or other foreign particles. If debris is deep or difficult to remove, seek medical help." /></ListItem>
          <ListItem><ListItemText primary="4. **Apply Antibiotic Ointment:** A thin layer can help keep the wound moist and prevent infection. (Optional, but recommended for minor cuts)." /></ListItem>
          <ListItem><ListItemText primary="5. **Cover the Wound:** Use a sterile bandage, gauze, or dressing. This keeps the wound clean and protects it from bacteria." /></ListItem>
          <ListItem><ListItemText primary="6. **Change Dressing Regularly:** Replace the dressing daily, or if it becomes wet or dirty. Re-clean the wound each time." /></ListItem>
          <ListItem><ListItemText primary="7. **Watch for Infection:** Look for increasing redness, swelling, pus, warmth around the wound, or fever. Seek medical attention immediately if these signs appear." /></ListItem>
          <ListItem><ListItemText primary="8. **Seek Medical Attention If:** Bleeding is severe/does not stop, wound is deep/gaping, caused by a bite, shows signs of infection, or person hasn't had a tetanus shot in 5 years for a deep cut." /></ListItem>
        </List>
      ),
    },
    {
      title: 'Burns (Minor - First and Second Degree)',
      content: (
        <List dense>
          <ListItem><ListItemText primary="1. **Cool the Burn:** Immediately hold the burned area under cool (not cold or icy) running water for 10-20 minutes. Alternatively, apply cool, wet compresses. Do NOT use ice directly as it can cause further damage." /></ListItem>
          <ListItem><ListItemText primary="2. **Remove Constricting Items:** Gently remove rings, watches, belts, or other items from the burned area before swelling begins." /></ListItem>
          <ListItem><ListItemText primary="3. **Do NOT Break Blisters:** If blisters form, do not pop them, as this increases the risk of infection. If they break naturally, clean gently and cover." /></ListItem>
          <ListItem><ListItemText primary="4. **Cover the Burn:** Once cooled, loosely cover the burn with a sterile, non-adhesive bandage or clean cloth. Avoid cotton, which can stick to the burn." /></ListItem>
          <ListItem><ListItemText primary="5. **Pain Relief:** Over-the-counter pain relievers like ibuprofen or acetaminophen can help manage pain." /></ListItem>
          <ListItem><ListItemText primary="6. **Do NOT Apply:** Butter, oil, toothpaste, or other home remedies – these can worsen the burn and increase infection risk." /></ListItem>
          <ListItem><ListItemText primary="7. **Seek Medical Attention Immediately If:** Burn is larger than 3 inches in diameter, on face/hands/feet/genitals/major joints, deep (third degree - white/charred, no pain), caused by chemicals/electricity, or if signs of infection appear." /></ListItem>
        </List>
      ),
    },
    {
      title: 'Sprains and Strains (R.I.C.E. Method)',
      content: (
        <List dense>
          <ListItem><ListItemText primary="1. **R - Rest:** Avoid using the injured body part. Stop any activity that causes pain." /></ListItem>
          <ListItem><ListItemText primary="2. **I - Ice:** Apply an ice pack (wrapped in a cloth) to the injured area for 15-20 minutes every 2-3 hours for the first 24-48 hours. This helps reduce swelling and pain." /></ListItem>
          <ListItem><ListItemText primary="3. **C - Compression:** Gently wrap the injured area with an elastic bandage (e.g., ACE bandage) to help reduce swelling. Ensure it's snug but not too tight to cut off circulation." /></ListItem>
          <ListItem><ListItemText primary="4. **E - Elevation:** Elevate the injured limb above the level of the heart, especially while sleeping, to help drain fluid away from the injury." /></ListItem>
          <ListItem><ListItemText primary="5. **Pain Management:** Over-the-counter pain relievers can help. Avoid alcohol, massage, and heat in the initial stages." /></ListItem>
          <ListItem><ListItemText primary="6. **When to Seek Medical Help:** If severe pain prevents weight-bearing, there's significant deformity, numbness, or symptoms don't improve within a few days." /></ListItem>
        </List>
      ),
    },
    {
      title: 'Choking (Adult/Child)',
      content: (
        <List dense>
          <ListItem><ListItemText primary="1. **Assess the Situation:** If the person can cough forcefully, speak, or breathe, do NOT interfere. Encourage them to keep coughing." /></ListItem>
          <ListItem><ListItemText primary="2. **If Severe Choking (Unable to cough/speak/breathe):** Call emergency services (e.g., 911 or local emergency number) immediately." /></ListItem>
          <ListItem><ListItemText primary="3. **Perform Back Blows:** Stand slightly to the side and behind the person. Support their chest with one hand. Bend them forward at the waist. Deliver 5 sharp blows with the heel of your hand between their shoulder blades." /></ListItem>
          <ListItem><ListItemText primary="4. **Perform Abdominal Thrusts (Heimlich Maneuver):** Stand behind the person. Place one foot slightly in front of the other for balance. Wrap your arms around their waist. Make a fist with one hand and place it just above their navel. Grasp your fist with your other hand. Deliver 5 quick, upward abdominal thrusts." /></ListItem>
          <ListItem><ListItemText primary="5. **Repeat:** Continue alternating 5 back blows and 5 abdominal thrusts until the object is dislodged or the person becomes unconscious." /></ListItem>
          <ListItem><ListItemText primary="6. **If Unconscious:** Begin CPR immediately (starting with chest compressions). Check the mouth for the object before each set of breaths." /></ListItem>
        </List>
      ),
    },
    {
      title: 'Severe Bleeding',
      content: (
        <List dense>
          <ListItem><ListItemText primary="1. **Call Emergency Services:** Immediately call 911 or your local emergency number." /></ListItem>
          <ListItem><ListItemText primary="2. **Apply Direct Pressure:** Use a clean cloth, sterile bandage, or even your bare hand if nothing else is available. Press firmly and directly on the wound." /></ListItem>
          <ListItem><ListItemText primary="3. **Elevate (If Possible):** If the bleeding is on an arm or leg, elevate the injured limb above the heart level while maintaining pressure." /></ListItem>
          <ListItem><ListItemText primary="4. **Maintain Pressure & Add Layers:** Do not remove the first layer of dressing, even if blood soaks through. Add more layers on top and continue firm pressure." /></ListItem>
          <ListItem><ListItemText primary="5. **Tourniquet (Last Resort):** If bleeding is severe, life-threatening, and cannot be controlled with direct pressure, apply a tourniquet above the wound if trained. Note the time of application." /></ListItem>
          <ListItem><ListItemText primary="6. **Monitor for Shock:** Keep the person warm, lying down with feet slightly elevated (if no head/neck injury), and reassure them. Signs of shock include pale, clammy skin, rapid pulse, and confusion." /></ListItem>
          <ListItem><ListItemText primary="7. **Do NOT Remove Embedded Objects:** If an object is stuck in the wound, do not remove it. Apply pressure around the object." /></ListItem>
        </List>
      ),
    },
    {
      title: 'Fractures and Broken Bones',
      content: (
        <List dense>
          <ListItem><ListItemText primary="1. **Call Emergency Services:** If it's a severe injury, the person is unresponsive, or you suspect a neck/head/back injury, call 911 immediately." /></ListItem>
          <ListItem><ListItemText primary="2. **Stop Bleeding (if present):** Apply direct pressure to any bleeding wounds with a sterile dressing." /></ListItem>
          <ListItem><ListItemText primary="3. **Immobilize the Injury (Splint):** Do not try to straighten the limb. Support the injured area above and below the break using a splint (e.g., rolled newspaper/magazine, board) secured with tape or bandages. The goal is to prevent movement." /></ListItem>
          <ListItem><ListItemText primary="4. **Apply Ice:** To reduce swelling and pain, apply ice packs (wrapped in cloth) to the injured area for 15-20 minutes at a time." /></ListItem>
          <ListItem><ListItemText primary="5. **Treat for Shock:** Keep the person warm and comfortable. Lay them down with feet slightly elevated, unless a head, neck, or leg injury prevents this." /></ListItem>
          <ListItem><ListItemText primary="6. **Monitor ABCs:** Ensure the person is breathing and has a pulse." /></ListItem>
          <ListItem><ListItemText primary="7. **Do NOT Move Unless Necessary:** Only move the person if they are in immediate danger." /></ListItem>
        </List>
      ),
    },
    {
      title: 'Fainting and Unconsciousness',
      content: (
        <List dense>
          <ListItem><ListItemText primary="1. **Check for Responsiveness:** Gently tap or shake the person and loudly ask, 'Are you okay?'." /></ListItem>
          <ListItem><ListItemText primary="2. **Call Emergency Services:** If unresponsive, immediately call 911 or your local emergency number." /></ListItem>
          <ListItem><ListItemText primary="3. **Check ABCs:** Airway (open?), Breathing (looking, listening, feeling for breath), Circulation (check for pulse)." /></ListItem>
          <ListItem><ListItemText primary="4. **Position the Person:** If breathing and no suspected spinal injury, gently roll them onto their side (recovery position) to prevent choking on vomit." /></ListItem>
          <ListItem><ListItemText primary="5. **Loosen Tight Clothing:** Loosen any tight clothing around the neck, chest, or waist." /></ListItem>
          <ListItem><ListItemText primary="6. **Monitor:** Stay with the person, continue to monitor their breathing and pulse until medical help arrives." /></ListItem>
          <ListItem><ListItemText primary="7. **If Fainting (Person Feels Dizzy):** Have them lie down with legs elevated about 12 inches. If they must sit, have them put their head between their knees." /></ListItem>
        </List>
      ),
    },
    {
      title: 'Severe Allergic Reactions (Anaphylaxis)',
      content: (
        <List dense>
          <ListItem><ListItemText primary="1. **Call Emergency Services Immediately:** This is a life-threatening emergency. Call 911 or your local emergency number right away." /></ListItem>
          <ListItem><ListItemText primary="2. **Administer Epinephrine (EpiPen):** If the person has a prescribed epinephrine auto-injector (EpiPen) and is able to, or you are trained, help them administer it. Follow instructions carefully." /></ListItem>
          <ListItem><ListItemText primary="3. **Position the Person:** Help them lie on their back. If they are vomiting, turn them onto their side. If they are having trouble breathing, allow them to sit up." /></ListItem>
          <ListItem><ListItemText primary="4. **Monitor ABCs:** Continuously check their airway, breathing, and circulation." /></ListItem>
          <ListItem><ListItemText primary="5. **Loosen Clothing:** Loosen any tight clothing around their neck or chest." /></ListItem>
          <ListItem><ListItemText primary="6. **Stay with the Person:** Do not leave them alone. Reassure them." /></ListItem>
          <ListItem><ListItemText primary="7. **Recognize Symptoms:** Look for sudden onset of hives/rash, swelling of face/lips/tongue/throat, difficulty breathing/wheezing, dizziness/fainting, rapid weak pulse, nausea/vomiting, sense of impending doom." /></ListItem>
        </List>
      ),
    },
    {
      title: 'Heat Exhaustion and Heatstroke',
      content: (
        <List dense>
          <ListItem><ListItemText primary="1. **Move to a Cooler Place:** Get the person out of the sun and into a shady or air-conditioned environment." /></ListItem>
          <ListItem><ListItemText primary="2. **Loosen Clothing:** Remove any tight or unnecessary clothing." /></ListItem>
          <ListItem><ListItemText primary="3. **Cool the Person:** Apply cool, wet cloths or a cool bath/shower. Fan the person. Offer sips of water if they are conscious and not nauseated. If they are conscious and can drink, provide a sports drink with electrolytes." /></ListItem>
          <ListItem><ListItemText primary="4. **Call Emergency Services (for Heatstroke):** If the person's condition worsens, they become confused/unconscious, stop sweating, or have a body temperature over 103°F (39.4°C), suspect heatstroke (a medical emergency) and call 911 immediately." /></ListItem>
          <ListItem><ListItemText primary="5. **Monitor:** Stay with the person and continue cooling efforts until medical help arrives or symptoms improve." /></ListItem>
          <ListItem><ListItemText primary="6. **Symptoms of Heat Exhaustion:** Heavy sweating, cold/clammy skin, fast weak pulse, nausea/vomiting, muscle cramps, tiredness, dizziness, headache." /></ListItem>
          <ListItem><ListItemText primary="7. **Symptoms of Heatstroke:** High body temperature (103°F+), hot/red/dry or damp skin, strong rapid pulse, throbbing headache, dizziness, nausea, confusion, unconsciousness." /></ListItem>
        </List>
      ),
    },
    {
      title: 'Seizures (Epileptic or Febrile)',
      content: (
        <List dense>
          <ListItem><ListItemText primary="1. **Stay Calm and Time the Seizure:** Note the start and end time of the seizure." /></ListItem>
          <ListItem><ListItemText primary="2. **Ensure Safety:** Move any objects away from the person that could cause injury. Place a soft, flat object (like a folded jacket) under their head." /></ListItem>
          <ListItem><ListItemText primary="3. **Do NOT Restrain:** Do not hold the person down or try to stop their movements. Do not put anything in their mouth (they cannot swallow their tongue)." /></ListItem>
          <ListItem><ListItemText primary="4. **Position After Seizure:** Once the shaking stops, gently roll the person onto their side (recovery position) to help keep their airway clear." /></ListItem>
          <ListItem><ListItemText primary="5. **Stay with the Person:** Remain with them until they are fully conscious and aware of their surroundings. Speak calmly and reassure them." /></ListItem>
          <ListItem><ListItemText primary="6. **Call Emergency Services (911) If:** Seizure lasts longer than 5 minutes, person has difficulty breathing/waking up after seizure, has another seizure soon after the first, is injured during the seizure, is pregnant, has diabetes, or has a seizure in water. Also call if it's their first seizure." /></ListItem>
        </List>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>First Aid Guide</Typography>
      <Typography variant="body1" paragraph>Browse comprehensive first aid topics for quick and detailed guidance in emergencies.</Typography>

      {firstAidTopics.map((topic, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{topic.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {topic.content}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
} 