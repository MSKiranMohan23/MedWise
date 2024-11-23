export interface OtherDetailsProps {
  manufacturer: string;
  trial_Phase: string;
  indications: string[];
  formulation: string;
}

export interface DrugInfoProps {
  drug_id: string;
  name: string;
  status: string;
  description: string;
  mechanism_of_action: string;
  side_effects: string[];
  other_details: OtherDetailsProps;
}


