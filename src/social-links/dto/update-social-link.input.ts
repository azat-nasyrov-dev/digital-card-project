import { InputType, PartialType } from '@nestjs/graphql';
import { AddSocialLinkInput } from './add-social-link.input.js';

@InputType({ description: 'Social link update input.' })
export class UpdateSocialLinkInput extends PartialType(AddSocialLinkInput) {}
