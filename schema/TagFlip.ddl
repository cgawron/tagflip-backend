CREATE TABLE corpus (c_id int(11) NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL UNIQUE, description text, PRIMARY KEY (c_id));
CREATE TABLE document (d_id int(11) NOT NULL AUTO_INCREMENT, c_id int(11) NOT NULL, filename varchar(255) NOT NULL, document_hash char(64) NOT NULL comment 'SHA-256', last_edited timestamp NULL, PRIMARY KEY (d_id), CONSTRAINT UK_Document_CorpusHash UNIQUE (c_id, document_hash));
CREATE TABLE tag (t_id int(11) NOT NULL AUTO_INCREMENT, a_id int(11) NOT NULL, d_id int(11) NOT NULL, start_index int(11) NOT NULL, end_index int(11) NOT NULL, PRIMARY KEY (t_id));
CREATE TABLE annotation (a_id int(11) NOT NULL AUTO_INCREMENT, s_id int(11) NOT NULL, name varchar(50) NOT NULL, color char(7) DEFAULT '#bbbbbb' NOT NULL, PRIMARY KEY (a_id), CONSTRAINT UK_AnnotationSet_AnnotationName UNIQUE (s_id, name));
CREATE TABLE annotationset (s_id int(11) NOT NULL AUTO_INCREMENT, name varchar(100) NOT NULL UNIQUE, description text, PRIMARY KEY (s_id));
CREATE TABLE corpus_annotationset (c_id int(11) NOT NULL, s_id int(11) NOT NULL, PRIMARY KEY (c_id, s_id));
ALTER TABLE document ADD INDEX FKdocument854677 (c_id), ADD CONSTRAINT FKdocument854677 FOREIGN KEY (c_id) REFERENCES corpus (c_id) ON DELETE Cascade;
ALTER TABLE tag ADD INDEX FKtag983812 (d_id), ADD CONSTRAINT FKtag983812 FOREIGN KEY (d_id) REFERENCES document (d_id) ON DELETE Cascade;
ALTER TABLE annotation ADD INDEX FKannotation324602 (s_id), ADD CONSTRAINT FKannotation324602 FOREIGN KEY (s_id) REFERENCES annotationset (s_id) ON DELETE Cascade;
ALTER TABLE corpus_annotationset ADD INDEX FKcorpus_ann848816 (s_id), ADD CONSTRAINT FKcorpus_ann848816 FOREIGN KEY (s_id) REFERENCES annotationset (s_id) ON DELETE Cascade;
ALTER TABLE corpus_annotationset ADD INDEX FKcorpus_ann874314 (c_id), ADD CONSTRAINT FKcorpus_ann874314 FOREIGN KEY (c_id) REFERENCES corpus (c_id) ON DELETE Cascade;
ALTER TABLE tag ADD INDEX FKtag961745 (a_id), ADD CONSTRAINT FKtag961745 FOREIGN KEY (a_id) REFERENCES annotation (a_id) ON DELETE Cascade;
