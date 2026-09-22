import { InputType, PartialType } from '@nestjs/graphql';
import { CreateDigitalCardInput } from './create-digital-card.input.js';

@InputType({ description: 'Digital card update input.' })
export class UpdateDigitalCardInput extends PartialType(CreateDigitalCardInput) {}
