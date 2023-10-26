import mongoose, { Document, Schema, Model } from 'mongoose';

interface SiteSettings {
  featured_article: string;
}

const siteSettingsSchema = new Schema<SiteSettings>({
  featured_article: String, 
});

export const SiteSettingsModel: Model<SiteSettings> = mongoose.model('SiteSettings', siteSettingsSchema);